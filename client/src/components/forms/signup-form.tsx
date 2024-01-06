// Imports: Libraries
import {
  FieldValues,
  useForm,
  UseFormRegister,
  Validate,
  ValidationRule,
} from 'react-hook-form';
import { FC } from 'react';
import { Link } from 'react-router-dom';

// Imports: APIs | Utils
import { SignUpPayload } from '@api/auth/auth-api';
import { useSignUp } from '@features/authentication/hooks/use-auth';
import { isValidEmailRegex } from '@utils/constants';

// Imports: Components
import { Button } from '@components/ui/button';
import { ErrorInput } from '@components/error-ui';
import { Input } from '@components/ui/input';

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpPayload>();

  const { signup, isLoading } = useSignUp();

  const onSubmit = async (data: SignUpPayload): Promise<void> => {
    const { email, name, password, passwordConfirm } = data;
    signup({ name, email, password, passwordConfirm });
  };

  return (
    <div className="w-full max-w-[400px] bg-white rounded-[12px]">
      <div className="px-6 py-8 md:py-10 md:p-10">
        <h1 className="font-semibold text-black text-center text-[26px]">
          Sign up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <InputField
            register={register}
            errors={errors}
            disabled={isLoading}
            name="name"
            placeholder="Your full name"
            type="text"
            requiredMessage="Name is required."
          />
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
            minLength={{
              value: 8,
              message: 'A password must have more or equal than 8 characters',
            }}
          />
          <InputField
            register={register}
            errors={errors}
            disabled={isLoading}
            name="passwordConfirm"
            placeholder="Confirm your password"
            type="password"
            requiredMessage="Password Confirm is required."
            validate={(value) => {
              const { password } = getValues();
              return value === password || 'The passwords do not match';
            }}
            minLength={{
              value: 8,
              message: 'A password must have more or equal than 8 characters',
            }}
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
            Sign Up
          </Button>
        </form>

        <span className="block mt-8 text-sm text-center text-black md:text-base">
          Already have an account?{' '}
          <Link to="/login" className="font-bold hover:underline">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

interface IInputField {
  register: UseFormRegister<SignUpPayload>;
  errors: FieldValues;
  disabled: boolean;
  name: 'name' | 'email' | 'password' | 'passwordConfirm';
  placeholder: string;
  type: string;
  requiredMessage: string;
  pattern?: ValidationRule<RegExp> | undefined;
  minLength?: ValidationRule<number> | undefined;
  validate?:
    | Validate<string, SignUpPayload>
    | Record<string, Validate<string, SignUpPayload>>
    | undefined;
}

const InputField: FC<IInputField> = ({
  register,
  errors,
  disabled,
  name,
  placeholder,
  type,
  requiredMessage,
  validate,
  minLength,
  pattern,
}) => (
  <div>
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
        validate,
        minLength,
        pattern,
      })}
    />
    {errors[name] && <ErrorInput message={errors[name].message} />}
  </div>
);
