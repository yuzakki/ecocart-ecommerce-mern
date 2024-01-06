// Imports: Libraries
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Imports: APIs | Utils
import {
  getCurrentUser,
  login as loginApi,
  signup as signupApi,
  logout as logoutApi,
  forgotPassword as forgotPasswordApi,
  resetPassword as resetPasswordApi,
} from '@api/auth/auth-api';

import { IUser } from '@utils/typings/user';

// ------------------------
// ---- Get current logged-in user
// ------------------------
export const useGetCurrentUser = () => {
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    retry: false,
  });

  const user: IUser = data?.user;

  return { isLoading, data, user, isSuccess, isError, error };
};

// ------------------------
// ---- Logs in a user
// ------------------------
export function useLogin() {
  const navigate = useNavigate();

  const { mutateAsync: login, isPending: isLoading } = useMutation({
    mutationFn: loginApi,

    onSuccess: () => {
      toast.success('Login successfull!');
      navigate('/', { replace: true });
    },

    onError: (error: any) => {
      toast.error(String(error.message));
    },
  });

  return { login, isLoading };
}

// ------------------------
// ---- Signs up a new user
// ------------------------
export function useSignUp() {
  const navigate = useNavigate();

  const { mutateAsync: signup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,

    onSuccess: (data) => {
      toast.success('Sign up successfull!');
      navigate('/', { replace: true });
    },

    onError: (error) => {
      toast.error(String(error.message));
    },
  });

  return { signup, isLoading };
}

// ------------------------
// ---- Logs out the current user
// ------------------------
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      navigate('/login', { replace: true });

      queryClient.setQueryData(['user'], null);
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      queryClient.clear();
    },

    onError: () => {
      toast.error('Something went wrong!');
    },
  });

  return { logout, isLoading };
}

// ------------------------
// ---- Sends a forgot password request
// ------------------------
export function useForgotPassword() {
  const { mutateAsync: forgotPassword, isPending: isLoading } = useMutation({
    mutationFn: forgotPasswordApi,

    onSuccess: () => {
      toast.success('Password reset sent!');
    },

    onError: (error) => {
      toast.error(String(error.message));
    },
  });

  return { forgotPassword, isLoading };
}

// ------------------------
// ---- Resets the password
// ------------------------
export function useResetPassword() {
  const navigate = useNavigate();
  const { mutateAsync: resetPassword, isPending: isLoading } = useMutation({
    mutationFn: resetPasswordApi,

    onSuccess: () => {
      toast.success('Password changed successfully!');
      navigate('/', { replace: true });
    },

    onError: (error) => {
      toast.error(String(error.message));
    },
  });

  return { resetPassword, isLoading };
}
