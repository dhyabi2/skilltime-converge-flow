
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Lock, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { paymentsService } from '@/services/supabase/payments';
import { useToast } from '@/hooks/use-toast';
import { hapticFeedback } from '@/utils/hapticFeedback';

interface PaymentFormProps {
  bookingData: {
    skillId: string;
    skillTitle: string;
    amount: number;
    currency: string;
  };
  onPaymentSuccess: (paymentResult: any) => void;
  onPaymentError: (error: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  bookingData,
  onPaymentSuccess,
  onPaymentError
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useTranslation('bookings');
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    hapticFeedback.light();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setPaymentError('');

    try {
      // Create payment intent
      const { clientSecret } = await paymentsService.createPaymentIntent({
        skillId: bookingData.skillId,
        amount: bookingData.amount * 1000, // Convert to fils (smallest currency unit for OMR)
        currency: bookingData.currency.toLowerCase()
      });

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Customer Name' // Should be dynamic
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent?.status === 'succeeded') {
        hapticFeedback.success();
        onPaymentSuccess({
          paymentIntentId: paymentIntent.id,
          amount: bookingData.amount,
          currency: bookingData.currency
        });
      }
    } catch (error: any) {
      hapticFeedback.error();
      const errorMessage = error.message || t('payment.generic_error');
      setPaymentError(errorMessage);
      onPaymentError(errorMessage);
      
      toast({
        title: t('payment.error'),
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1e293b',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        '::placeholder': {
          color: '#64748b',
        },
      },
    },
    hidePostalCode: true,
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <CreditCard className="w-5 h-5 text-green-600" />
          {t('payment.secure_payment')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Summary */}
        <div className="bg-gradient-to-r from-soft-blue-50 to-mint-50 p-4 rounded-xl border border-soft-blue-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-600">{t('payment.service')}</span>
            <span className="font-medium text-slate-800">{bookingData.skillTitle}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">{t('payment.total')}</span>
            <span className="text-xl font-bold text-green-600">
              {bookingData.amount} {bookingData.currency}
            </span>
          </div>
        </div>

        {/* Card Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 border border-slate-200 rounded-xl bg-white">
            <CardElement options={cardElementOptions} />
          </div>

          {paymentError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{paymentError}</p>
            </div>
          )}

          {/* Security Info */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Shield className="w-4 h-4" />
            <span>{t('payment.security_notice')}</span>
            <Lock className="w-3 h-3" />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!stripe || processing}
            className="w-full h-12 bg-gradient-to-r from-green-600 to-mint-600 hover:from-green-700 hover:to-mint-700 text-white font-semibold rounded-xl shadow-lg border-0"
          >
            {processing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {t('payment.processing')}
              </div>
            ) : (
              `${t('payment.pay_now')} ${bookingData.amount} ${bookingData.currency}`
            )}
          </Button>
        </form>

        {/* Terms */}
        <p className="text-xs text-slate-500 text-center">
          {t('payment.terms_notice')}
        </p>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
