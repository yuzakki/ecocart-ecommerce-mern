// Imports: Libraries
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Imports: APIs | Utils
import { UpdateMePayload } from '@api/auth/user-api';
import { useGetCurrentUser } from '@features/authentication/hooks/use-auth';
import { useUpdateUser } from '@features/authentication/hooks/use-user';

// Imports: Components
import { Button } from '@components/ui/button';
import { UserDetailField } from './user-details-field';
import { isValidPhoneNumber } from '@utils/constants';

interface IUserDetailsContent {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const UserDetailsContent: FC<IUserDetailsContent> = ({
  isOpen,
  setIsOpen,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateMePayload>();
  const { updateUserData, isLoading, isSuccess } = useUpdateUser();
  const {
    data: { user },
  } = useGetCurrentUser();

  const onSubmit = (data: UpdateMePayload) => updateUserData(data);

  useEffect(() => {
    isSuccess && setIsOpen(false);
  }, [setIsOpen, isSuccess]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="basis-[45%] space-y-4 mx-4"
    >
      <UserDetailField
        isOpen={isOpen}
        errors={errors}
        disabled={isLoading}
        label="Name"
        name="name"
        type="text"
        defaultValue={user?.name}
        register={register}
      />
      <UserDetailField
        errors={errors}
        label="Role"
        name="role"
        register={register}
        type="text"
        isOpen={false}
        defaultValue={user?.role}
      />
      <UserDetailField
        errors={errors}
        isOpen={isOpen}
        disabled={isLoading}
        label="Email"
        name="email"
        type="email"
        defaultValue={user?.email}
        register={register}
      />
      <UserDetailField
        errors={errors}
        isOpen={isOpen}
        disabled={isLoading}
        label="Phone"
        name="phone"
        type="text"
        placeholder={
          !user?.phone && !isOpen ? 'Phone not set yet' : 'Your phone number'
        }
        pattern={{
          value: isValidPhoneNumber,
          message: 'Please enter a valid phone number',
        }}
        defaultValue={user?.phone}
        register={register}
      />
      <UserDetailField
        errors={errors}
        isOpen={isOpen}
        disabled={isLoading}
        label="Country"
        name="country"
        type="text"
        placeholder={
          !user?.country && !isOpen ? 'Country not set yet' : 'Your country'
        }
        defaultValue={user?.country}
        register={register}
      />

      {isOpen && (
        <div className="mt-2">
          <Button
            className="px-5 py-3 text-base bg-green-600 rounded-full hover:bg-green-500"
            type="submit"
            disabled={isLoading}
          >
            Update
          </Button>
          <Button
            variant="link"
            disabled={isLoading}
            className="text-green-600"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Cancel
          </Button>
        </div>
      )}
    </form>
  );
};
