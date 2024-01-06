import api from '@api';

export async function getAllOrders() {
  try {
    const { data } = await api.get('/api/orders');

    return data;
  } catch (error: any) {
    throw error.response.data;
  }
}

// ######################

export async function getSingleOrder(orderID: string | undefined) {
  try {
    const { data } = await api.get(`/api/orders/${orderID}`);

    return data;
  } catch (error: any) {
    throw error.response.data;
  }
}
