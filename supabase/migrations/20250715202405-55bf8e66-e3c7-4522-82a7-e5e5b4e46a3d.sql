
-- Create payment_transactions table
CREATE TABLE public.payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT UNIQUE,
  amount DECIMAL(10,3) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'OMR',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create booking_notifications table
CREATE TABLE public.booking_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_notifications ENABLE ROW LEVEL SECURITY;

-- RLS policies for payment_transactions
CREATE POLICY "Users can view their payment transactions" ON public.payment_transactions
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.bookings 
    WHERE bookings.id = payment_transactions.booking_id 
    AND (bookings.client_id = auth.uid() OR bookings.provider_id = auth.uid())
  )
);

CREATE POLICY "System can insert payment transactions" ON public.payment_transactions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "System can update payment transactions" ON public.payment_transactions
FOR UPDATE
USING (true);

-- RLS policies for booking_notifications
CREATE POLICY "Users can view their notifications" ON public.booking_notifications
FOR SELECT
USING (recipient_id = auth.uid());

CREATE POLICY "System can insert notifications" ON public.booking_notifications
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can update their notifications" ON public.booking_notifications
FOR UPDATE
USING (recipient_id = auth.uid());
