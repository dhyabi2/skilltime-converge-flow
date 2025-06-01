
// Payments API module
export const paymentsAPI = {
  processPayment: async (paymentData) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate payment processing
    if (paymentData.amount > 0) {
      return {
        success: true,
        transactionId: `txn_${Date.now()}`,
        amount: paymentData.amount,
        currency: 'OMR',
        status: 'completed',
        receiptUrl: 'https://example.com/receipt/123'
      };
    }
    
    throw new Error('Invalid payment amount');
  },

  getPaymentHistory: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return [
      {
        id: 'txn_1',
        amount: 29,
        currency: 'OMR',
        description: 'UI/UX Design Consultation',
        date: '2024-05-25T14:30:00Z',
        status: 'completed',
        receiptUrl: 'https://example.com/receipt/1'
      },
      {
        id: 'txn_2',
        amount: 58,
        currency: 'OMR',
        description: 'React Development Session',
        date: '2024-05-20T10:15:00Z',
        status: 'completed',
        receiptUrl: 'https://example.com/receipt/2'
      }
    ];
  },

  createPaymentIntent: async (amount, currency = 'OMR') => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      clientSecret: `pi_${Date.now()}_secret`,
      paymentIntentId: `pi_${Date.now()}`,
      amount,
      currency
    };
  },

  confirmPayment: async (paymentIntentId) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      status: 'succeeded',
      transactionId: paymentIntentId
    };
  },

  refundPayment: async (transactionId, amount) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return {
      success: true,
      refundId: `ref_${Date.now()}`,
      amount,
      status: 'completed'
    };
  },

  getPaymentMethods: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return [
      {
        id: 'pm_1',
        type: 'card',
        last4: '4242',
        brand: 'visa',
        isDefault: true
      },
      {
        id: 'pm_2',
        type: 'card',
        last4: '5555',
        brand: 'mastercard',
        isDefault: false
      }
    ];
  },

  addPaymentMethod: async (paymentMethodData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      paymentMethod: {
        id: `pm_${Date.now()}`,
        ...paymentMethodData
      }
    };
  },

  removePaymentMethod: async (paymentMethodId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      message: 'Payment method removed successfully'
    };
  }
};
