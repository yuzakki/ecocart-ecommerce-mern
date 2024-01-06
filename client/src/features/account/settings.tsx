// Imports: Libraries
import { LogOutIcon } from 'lucide-react';

// Imports: APIs | Utils
import { useLogout } from '@features/authentication/hooks/use-auth';

// Imports: Components
import ChangePasswordForm from '@components/forms/change-password-form';
import { LoaderSpinner } from '@components/loaders/loader-spinner';
import { Button } from '@components/ui/button';

export default function Settings() {
  const { logout, isLoading } = useLogout();

  return (
    <div className="flex flex-col">
      <ChangePasswordForm />

      <div className="mt-10">
        <Button
          onClick={() => logout()}
          disabled={isLoading}
          variant="destructive"
          className="float-right space-x-2"
        >
          {!isLoading ? (
            <LogOutIcon className="text-white" size={20} />
          ) : (
            <LoaderSpinner />
          )}
          <h2 className="text-base font-medium text-white">Log Out</h2>
        </Button>
      </div>
    </div>
  );
}
