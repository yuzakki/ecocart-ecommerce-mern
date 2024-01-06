// Imports: Libraries
import { Pencil } from 'lucide-react';

// Imports: APIs | Utils
import { useFileUpload } from '@hooks/use-file-upload';
import { IUser } from '@utils/typings/user';
import { SERVER_DOMAIN } from '@utils/constants';

// Imports: Components
import { Label } from '@components/ui/label';
import { Input } from '@components/ui/input';
import { LoaderSpinner } from '@components/loaders/loader-spinner';

interface IProfilePicture {
  user: IUser;
  isLoading: boolean;
}

export function ProfilePicture({ user, isLoading }: IProfilePicture) {
  const { handleFileUpload, isLoading: isUpdating } = useFileUpload('photo');

  return (
    <div className="flex items-center justify-center mx-auto overflow-hidden max-w-32 max-h-32">
      {isLoading && (
        <div className="flex items-center justify-center w-32 h-32 rounded-full bg-slate-50">
          <LoaderSpinner />
        </div>
      )}

      {!isLoading && (
        <div className="relative">
          {!isUpdating && (
            <>
              <div className="rounded-full bg-slate-50 min-h-32 min-w-32">
                <img
                  className="z-10 rounded-full"
                  src={`${SERVER_DOMAIN}/images/users/${user?.photo}`}
                  alt={`${user?.name} Image`}
                />
              </div>
              <div className="absolute right-0 z-10 flex items-center justify-center float-right w-8 h-8 duration-100 bg-white border-2 border-black rounded-full cursor-pointer hover:bg-slate-100 bottom-1 ">
                <Label
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-full h-full rounded-full cursor-pointer"
                >
                  <Pencil size={17} />
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            </>
          )}

          {isUpdating && (
            <div className="flex items-center justify-center w-32 h-32 rounded-full bg-slate-50">
              <LoaderSpinner />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
