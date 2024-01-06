import { ThreeDots } from 'react-loader-spinner';

export const GlobalLoader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <ThreeDots height="80" width="80" color="black" ariaLabel="loading" />
    </div>
  );
};

export const ThreeDotsLoader = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center w-full my-20 ${className}`}>
      <ThreeDots height="80" width="80" color="black" ariaLabel="loading" />
    </div>
  );
};
