import api from '@api';

export async function createCheckoutSession() {
  try {
    const { data } = await api.post('/api/checkout/create-checkout-session');

    return data;
  } catch (error: any) {
    throw error.response.data;
  }
}

// ######################

export async function getCheckoutSession() {
  try {
    const { data } = await api.get('/api/checkout/retrieve-checkout-session');

    return data;
  } catch (error: any) {
    throw error.response.data;
  }
}
