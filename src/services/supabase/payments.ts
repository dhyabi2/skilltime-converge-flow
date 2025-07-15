
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type PaymentTransaction = Database['public']['Tables']['payment_transactions']['Row'];
type PaymentTransactionInsert = Database['public']['Tables']['payment_transactions']['Insert'];

export const paymentsService = {
  async createPaymentIntent(bookingData: {
    skillId: string;
    amount: number;
    currency?: string;
  }) {
    const { data, error } = await supabase.functions.invoke('create-payment-intent', {
      body: bookingData
    });

    if (error) throw error;
    return data;
  },

  async confirmPayment(paymentIntentId: string, bookingId: string) {
    const { data, error } = await supabase.functions.invoke('confirm-payment', {
      body: { paymentIntentId, bookingId }
    });

    if (error) throw error;
    return data;
  },

  async getPaymentStatus(bookingId: string) {
    const { data, error } = await supabase
      .from('payment_transactions')
      .select('*')
      .eq('booking_id', bookingId)
      .single();

    if (error) throw error;
    return data;
  },

  async processRefund(bookingId: string, reason?: string) {
    const { data, error } = await supabase.functions.invoke('process-refund', {
      body: { bookingId, reason }
    });

    if (error) throw error;
    return data;
  }
};
