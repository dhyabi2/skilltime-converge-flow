
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CONFIRM-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { paymentIntentId, bookingId } = await req.json();
    if (!paymentIntentId || !bookingId) {
      throw new Error("Missing required fields");
    }
    logStep("Request validated", { paymentIntentId, bookingId });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    logStep("Payment intent retrieved", { 
      status: paymentIntent.status, 
      amount: paymentIntent.amount 
    });

    if (paymentIntent.status !== 'succeeded') {
      throw new Error(`Payment not successful. Status: ${paymentIntent.status}`);
    }

    // Record payment transaction
    const { data: transaction, error: transactionError } = await supabaseClient
      .from('payment_transactions')
      .insert({
        booking_id: bookingId,
        stripe_payment_intent_id: paymentIntentId,
        amount: paymentIntent.amount / 100, // Convert from fils to OMR
        currency: paymentIntent.currency.toUpperCase(),
        status: 'succeeded'
      })
      .select()
      .single();

    if (transactionError) {
      logStep("ERROR creating transaction", { error: transactionError });
      throw transactionError;
    }

    logStep("Payment transaction recorded", { transactionId: transaction.id });

    // Update booking status to confirmed
    const { error: bookingError } = await supabaseClient
      .from('bookings')
      .update({ 
        status: 'confirmed',
        updated_at: new Date().toISOString()
      })
      .eq('id', bookingId);

    if (bookingError) {
      logStep("ERROR updating booking", { error: bookingError });
      throw bookingError;
    }

    logStep("Booking status updated to confirmed");

    // Create notification for provider
    const { data: booking } = await supabaseClient
      .from('bookings')
      .select('provider_id, skill_id, skills(title)')
      .eq('id', bookingId)
      .single();

    if (booking?.provider_id) {
      await supabaseClient
        .from('booking_notifications')
        .insert({
          booking_id: bookingId,
          recipient_id: booking.provider_id,
          type: 'payment_received',
          message: `Payment received for ${booking.skills?.title || 'your service'}`
        });
      
      logStep("Provider notification created");
    }

    return new Response(JSON.stringify({
      success: true,
      transaction: transaction,
      message: "Payment confirmed successfully"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
