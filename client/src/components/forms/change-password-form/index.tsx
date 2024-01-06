// Imports: Libraries
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

// Imports: APIs | Utils
import { updatePasswordPayload } from '@api/auth/user-api';
import { useUpdatePassword } from '@features/authentication/hooks/use-user';

// Imports: Components
import { Button } from '@components/ui/button';
import { InputField } from './input-field';

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<updatePasswordPayload>();
  const { updatePassword, isLoading } = useUpdatePassword();

  const onSubmit = (data: updatePasswordPayload) => {
    const { currentPassword, password, passwordConfirm } = data;
    updatePassword({ currentPassword, password, passwordConfirm });
  };

  return (
    <>
      <div className="pb-6 space-y-1 border-b mb-7">
        <h2 className="text-lg font-bold">Settings</h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          disabled={isLoading}
          label="Old Password"
          name="currentPassword"
          type="password"
          register={register}
          errors={errors}
          requiredMessage="This field is required"
        />

        <InputField
          disabled={isLoading}
          label="New Password"
          name="password"
          type="password"
          register={register}
          errors={errors}
          requiredMessage="This field is required"
          minLength={{
            value: 8,
            message: 'A password must have more or equal than 8 characters',
          }}
        />

        <InputField
          disabled={isLoading}
          label="Confirm New Password"
          name="passwordConfirm"
          type="password"
          register={register}
          errors={errors}
          requiredMessage="This field is required"
          validate={(value: string) => {
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

        <Button className="float-left" disabled={isLoading} type="submit">
          Update
        </Button>
      </form>
    </>
  );
}
