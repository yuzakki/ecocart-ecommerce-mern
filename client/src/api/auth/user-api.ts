import api from '@api';

export interface UpdateMePayload extends FormData {
  role?: string;
  name?: string;
  email?: string;
  phone?: number;
  country?: string;
}

export async function updateUserData(payload: UpdateMePayload) {
  try {
    const { data } = await api.patch('/api/user/update-me', payload);

    return data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
}

// ######################

export interface updatePasswordPayload {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
}

export async function updatePassword(payload: updatePasswordPayload) {
  try {
    const { data } = await api.patch('/api/user/update-my-password', payload);

    return data;
  } catch (error: any) {
    throw error.response.data;
  }
}
