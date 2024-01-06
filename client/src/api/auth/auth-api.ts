import api from '@api';

export async function getCurrentUser() {
  try {
    const { data } = await api.get('/api/auth/isAuthenticated');

    return data;
  } catch (error: any) {
    throw error.response.data;
  }
}

// ######################

export interface LoginPayload {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginPayload) {
  try {
    const { data } = await api.post('/api/auth/login', { email, password });

    return data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
}

// ######################

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export async function signup({
  name,
  email,
  password,
  passwordConfirm,
}: SignUpPayload) {
  try {
    const { data } = await api.post('/api/auth/signup', {
      name,
      email,
      password,
      passwordConfirm,
    });

    return data;
  } catch (error: any) {
    throw error.response.data;
  }
}

// ######################

export async function logout() {
  try {
    const { data } = await api.post('/api/auth/logout');

    return data;
  } catch (error: any) {
    throw error.response.data;
  }
}

// ######################

export interface ForgotPasswordPayload {
  email: string;
}

export async function forgotPassword({ email }: ForgotPasswordPayload) {
  try {
    const { data } = await api.post('/api/auth/forgotPassword', { email });

    return data;
  } catch (error: any) {
    throw error.response.data;
  }
}

// ######################

export interface ResetPasswordPayload {
  password: string;
  passwordConfirm: string;
  token: string | undefined;
}

export async function resetPassword({
  password,
  passwordConfirm,
  token,
}: ResetPasswordPayload) {
  try {
    const { data } = await api.patch(`/api/auth/resetPassword/${token}`, {
      password,
      passwordConfirm,
    });

    return data;
  } catch (error: any) {
    throw error.response.data;
  }
}
