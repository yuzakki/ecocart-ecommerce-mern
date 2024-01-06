// Imports: Libraries
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

// Imports: APIs | Utils
import { useResetPassword } from '@features/authentication/hooks/use-auth';
import { ResetPasswordPayload } from '@api/auth/auth-api';

// Imports: Components
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { ErrorInput } from '@components/error-ui';
import { isValidEmailRegex } from '@utils/constants';

export const ResetPasswordForm = () => {
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ResetPasswordPayload>();
  const { resetPassword, isLoading } = useResetPassword();

  const onSubmit = async (data: ResetPasswordPayload) => {
    const { password, passwordConfirm } = data;
    resetPassword({ password, passwordConfirm, token });
  };

  return (
    <div className="px-4 py-8 mx-auto">
      <h2 className="mb-4 text-3xl font-bold text-center">
        Reset Your Password
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-10 space-y-5"
      >
        <div className="space-y-2">
          <h2 className="text-lg font-medium">New Password</h2>
          <Input
            type="password"
            className="border-slate-300"
            disabled={isLoading}
            {...register('password', {
              required: {
                value: true,
                message: 'this field is required',
              },
            })}
          />

          {errors.password && <ErrorInput message={errors.password.message} />}
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-medium">Confirm New Password</h2>
          <Input
            type="password"
            className="border-slate-300"
            disabled={isLoading}
            {...register('passwordConfirm', {
              required: {
                value: true,
                message: 'this field is required',
              },
              validate: (value) => {
                const { password } = getValues();
                return value === password || 'The passwords do not match';
              },
              minLength: {
                value: 8,
                message: 'A password must have more or equal than 8 characters',
              },
            })}
          />
          {errors.passwordConfirm && (
            <ErrorInput message={errors.passwordConfirm.message} />
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="block w-full px-4 py-3 mt-10 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
        >
          Update Password
        </Button>
      </form>
    </div>
  );
};
