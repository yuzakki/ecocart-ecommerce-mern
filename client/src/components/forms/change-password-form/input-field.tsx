// Imports: Libraries
import { UseFormRegister, FieldValues, ValidationRule } from 'react-hook-form';
import { FC } from 'react';

// Imports: APIs | Utils
import { updatePasswordPayload } from '@api/auth/user-api';

// Imports: Components
import { ErrorInput } from '@components/error-ui';
import { Input } from '@components/ui/input';

interface IInputField {
  register: UseFormRegister<updatePasswordPayload>;
  errors: FieldValues;
  name: 'currentPassword' | 'password' | 'passwordConfirm';
  requiredMessage: string;
  type?: string;
  disabled?: boolean;
  label?: string;
  validate?: (value: string) => boolean | string;
  minLength?: ValidationRule<number> | undefined;
}

export const InputField: FC<IInputField> = ({
  register,
  label,
  name,
  type,
  errors,
  disabled,
  validate,
  requiredMessage,
  minLength,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-lg font-medium" htmlFor={name}>
        {label}
      </label>
      <Input
        type={type}
        disabled={disabled}
        {...register(name, {
          required: { value: true, message: requiredMessage },
          validate,
          minLength,
        })}
      />

      {errors[name] && <ErrorInput message={errors[name].message} />}
    </div>
  );
};
