import api from "@api";

export async function getCart() {
  try {
    const { data } = await api.get('/api/cart');

    return data;
  } catch (error: any) {
    throw error.response.data;
  }
}

// ######################

export async function addItem(productId: string | undefined) {
  try {
    const { data } = await api.patch(`/api/cart/add-item/${productId}`);

    return data;
  } catch (error: any) {
    throw error.response.data;
  }
}

// ######################

export async function removeItem(productId: string | undefined) {
  try {
    const { data } = await api.delete(`api/cart/remove-item/${productId}`);

    return data;
  } catch (error: any) {
    throw error.response.data;
  }
}

// ######################

export async function increaseQuantity(productId: string | undefined) {
  try {
    const { data } = await api.patch(
      `api/cart/increase-quantity/${productId}`
    );

    return data;
  } catch (error: any) {
    throw error.response.data;
  }
}

// ######################

export async function decreaseQuantity(productId: string | undefined) {
  try {
    const { data } = await api.patch(
      `api/cart/decrease-quantity/${productId}`
    );

    return data;
  } catch (error: any) {
    throw error.response.data;
  }
}
