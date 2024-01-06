// Imports: Libraries
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Imports: APIs
import {
  UpdateMePayload,
  updateUserData as udpateUserDataApi,
  updatePassword as updatePasswordApi,
} from '@api/auth/user-api';

// ------------------------
// ---- Updates user data
// ------------------------
export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUserData,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (data: UpdateMePayload | FormData) => udpateUserDataApi(data),

    onSuccess: () => {
      toast.success('User data successfully updated');

      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },

    onError: (error) => {
      toast.error(String(error.message));
      console.log(error)
    },
  });

  return { updateUserData, isLoading, isSuccess };
}

// ------------------------
// ---- Updates user password
// ------------------------
export function useUpdatePassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: updatePassword, isPending: isLoading } = useMutation({
    mutationFn: updatePasswordApi,

    onSuccess: (data) => {
      toast.success('Password updated successfully!');
      queryClient.setQueryData(['user'], data.data.user);
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      navigate('/account', { replace: true });
    },

    onError: (error: any) => {
      toast.error(String(error.message));
    },
  });

  return { updatePassword, isLoading };
}
