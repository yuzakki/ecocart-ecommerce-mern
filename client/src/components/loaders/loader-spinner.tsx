import { FC } from 'react';

type LoaderSpinnerProps = {
  bg?: string;
  size?: number;
};

export const LoaderSpinner: FC<LoaderSpinnerProps> = ({
  bg = '#000',
  size = 24,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={bg}
      xmlns="http://www.w3.org/2000/svg"
    >
      <style
        dangerouslySetInnerHTML={{
          __html:
            '.spinner_aj0A{transform-origin:center;animation:spinner_KYSC .75s infinite linear}@keyframes spinner_KYSC{100%{transform:rotate(360deg)}}',
        }}
      />
      <path
        d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
        className="spinner_aj0A"
      />
    </svg>
  );
};
