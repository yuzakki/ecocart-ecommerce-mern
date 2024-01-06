import { LoaderSpinner } from '@components/loaders/loader-spinner';

export const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <LoaderSpinner />
    </div>
  );
};

interface IConfirmOrder {
  message: string | undefined;
}
export const ConfirmOrderError = ({ message }: IConfirmOrder) => {
  return (
    <div className="w-full mx-auto mt-16 text-center">
      <h1 className="text-3xl font-black text-sl">{message}</h1>
    </div>
  );
};
