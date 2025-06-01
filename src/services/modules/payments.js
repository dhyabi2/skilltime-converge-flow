
// Payments API module
export const paymentsAPI = {
  processPayment: async (paymentData) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      transactionId: `txn_${Date.now()}`,
      amount: paymentData.amount,
      currency: 'USD',
      status: 'completed',
      method: paymentData.method || 'card',
      createdAt: new Date().toISOString()
    };
  },

  getPaymentMethods: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return [
      {
        id: 'pm_1',
        type: 'card',
        last4: '4242',
        brand: 'visa',
        expiryMonth: 12,
        expiryYear: 2025,
        isDefault: true
      },
      {
        id: 'pm_2',
        type: 'card',
        last4: '0000',
        brand: 'mastercard',
        expiryMonth: 6,
        expiryYear: 2026,
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
        ...paymentMethodData,
        createdAt: new Date().toISOString()
      }
    };
  }
};
