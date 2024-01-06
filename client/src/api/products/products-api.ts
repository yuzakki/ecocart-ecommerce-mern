import api from '@api';

export async function getAllProducts() {
  try {
    const { data } = await api.get('/api/products');

    return data;
  } catch (error: any) {
    throw error.reponsnse.data;
  }
}

// ######################

export async function getSingleProduct(id: string | undefined) {
  try {
    const { data } = await api.get(`/api/products/${id}`);

    return data;
  } catch (error: any) {
    throw error.response.data;
  }
}
