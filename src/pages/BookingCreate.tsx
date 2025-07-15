
import React from 'react';
import { useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import EnhancedBookingCreate from '@/components/booking/EnhancedBookingCreate';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here');

const BookingCreate = () => {
  return (
    <Elements stripe={stripePromise}>
      <EnhancedBookingCreate />
    </Elements>
  );
};

export default BookingCreate;
