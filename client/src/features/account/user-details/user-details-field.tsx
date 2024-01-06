import { FieldValues, UseFormRegister, ValidationRule } from 'react-hook-form';

import { UpdateMePayload } from '@api/auth/user-api';
import { Input } from '@components/ui/input';
import { FC } from 'react';
import { ErrorInput } from '@components/error-ui';

interface IUserDetailField {
  register: UseFormRegister<UpdateMePayload>;
  errors: FieldValues;
  defaultValue: any;
  name: 'name' | 'email' | 'phone' | 'country' | 'role';
  type?: string;
  label?: string;
  placeholder?: string;
  isOpen?: boolean;
  disabled?: boolean;
  pattern?: ValidationRule<RegExp> | undefined;
}

export const UserDetailField: FC<IUserDetailField> = ({
  register,
  errors,
  label,
  name,
  placeholder,
  type,
  defaultValue,
  isOpen,
  disabled,
  pattern,
}) => {
  return (
    <div>
      <label className="block pb-1" htmlFor={name}>
        {label}
      </label>
      <Input
        type={type}
        placeholder={placeholder}
        disabled={!isOpen || disabled}
        defaultValue={defaultValue}
        className="text-black bg-slate-200"
        {...register(name, {
          pattern,
        })}
      />
      {errors[name] && isOpen && <ErrorInput message={errors[name].message} />}
    </div>
  );
};
