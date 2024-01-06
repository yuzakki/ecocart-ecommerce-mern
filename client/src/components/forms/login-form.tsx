// Imports: Libraries
import { Link } from 'react-router-dom';
import { FC } from 'react';
import {
  useForm,
  FieldValues,
  UseFormRegister,
  ValidationRule,
} from 'react-hook-form';

// Imports: APIs | Utils
import { useLogin } from '@features/authentication/hooks/use-auth';
import { LoginPayload } from '@api/auth/auth-api';
import { isValidEmailRegex } from '@utils/constants';

// Imports: Components
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { ErrorInput } from '@components/error-ui';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();

  const { login, isLoading } = useLogin();

  const onSubmit = (data: LoginPayload) => {
    const { email, password } = data;
    login({ email, password });
  };

  return (
    <div className="w-full max-w-[400px] bg-white rounded-[12px]">
      <div className="px-6 py-8 md:py-10 md:p-10">
        <h1 className="font-semibold text-black text-center text-[26px]">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <InputField
            register={register}
            errors={errors}
            disabled={isLoading}
            name="email"
            placeholder="Your email"
            type="email"
            requiredMessage="Email is required."
            pattern={{
              value: isValidEmailRegex,
              message: 'Please enter a valid email',
            }}
          />
          <InputField
            register={register}
            errors={errors}
            disabled={isLoading}
            name="password"
            placeholder="Your password"
            type="password"
            requiredMessage="Password is required."
          />

          <span className="block text-slate-600 text-end">
            <Link
              to="/forgot-password"
              className="text-[15px] font-medium hover:underline"
            >
              Forgot password?
            </Link>
          </span>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-5 mt-2 text-lg font-medium "
          >
            Login
          </Button>
        </form>

        <span className="block mt-8 text-sm text-center text-black md:text-base">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold hover:underline">
            Sign Up
          </Link>
        </span>
      </div>
    </div>
  );
};

interface IInputField {
  register: UseFormRegister<LoginPayload>;
  errors: FieldValues;
  disabled: boolean;
  name: 'email' | 'password';
  placeholder: string;
  type: string;
  requiredMessage: string;
  pattern?: ValidationRule<RegExp> | undefined;
}

const InputField: FC<IInputField> = ({
  register,
  errors,
  disabled,
  name,
  placeholder,
  type,
  requiredMessage,
  pattern,
}) => (
  <>
    <Input
      disabled={disabled}
      placeholder={placeholder}
      className="text-black bg-slate-50"
      type={type}
      {...register(name, {
        required: {
          value: true,
          message: requiredMessage,
        },
        pattern,
      })}
    />

    {errors[name] && <ErrorInput message={errors[name].message} />}
  </>
);
