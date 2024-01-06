// Imports: Libraries
import { X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// Imports: APIs | Utils
import { useForgotPassword } from '@features/authentication/hooks/use-auth';
import { ForgotPasswordPayload } from '@api/auth/auth-api';
import { isValidEmailRegex } from '@utils/constants';

// Imports: Components
import { ErrorInput } from '@components/error-ui';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';

export default function ForgotPasswordForm() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordPayload>();

  const { forgotPassword, isLoading } = useForgotPassword();

  const onSubmit = (data: ForgotPasswordPayload) => {
    const { email } = data;
    forgotPassword(
      { email },
      {
        onSuccess: () => {
          reset();
          setIsOpen(true);
        },
      }
    );
  };

  return (
    <div className="px-4 py-8 mx-auto">
      <h2 className="mb-4 text-3xl font-bold text-center">
        Forgot Your Password?
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-10"
      >
        <p className="text-center text-gray-600">
          Enter the email connected to your account and we will send an email
          with instructions how to reset your password.
        </p>

        <label
          htmlFor="email"
          className="block mt-3 mb-2 font-medium text-gray-700"
        >
          Email
        </label>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register('email', {
            required: {
              value: true,
              message: 'Email is required',
            },
            pattern: {
              value: isValidEmailRegex,
              message: 'Please enter a valid email',
            },
          })}
        />
        {errors.email && <ErrorInput message={errors.email.message} />}

        {isOpen && (
          <span className="px-2.5 flex justify-between py-3 font-medium text-sm text-white bg-green-500 opacity-80 mt-3 rounded-sm">
            Password reset sent successfully! Please check your email.
            <X
              size={20}
              className="inline float-right my-auto cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </span>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="block w-full px-4 py-3 mt-10 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
        >
          Send Link
        </Button>
      </form>
    </div>
  );
}
