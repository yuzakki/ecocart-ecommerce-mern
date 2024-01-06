import { Skeleton } from '@components/ui/skeleton';
import { IUser } from '@utils/typings/user';

interface IUserInfo {
  user: IUser;
  isLoading: boolean;
}

export function UserInfo({ user, isLoading }: IUserInfo) {
  return (
    <div className="my-2 space-y-1 text-center">
      <h1 className="text-2xl font-semibold">
        {!isLoading && (user?.name || 'name')}
        {isLoading && <Skeleton className="w-2/4 h-5 mx-auto" />}
        {!isLoading && user?.role !== 'user' && `(${user?.role})`}
        {isLoading && <Skeleton className="w-2/4 h-5 mx-auto" />}
      </h1>
    </div>
  );
}
