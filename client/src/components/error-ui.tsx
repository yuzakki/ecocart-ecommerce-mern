import { Link } from 'react-router-dom';
import { Button } from './ui/button';

interface IError {
  message: string | undefined;
}

export const ErrorInput = ({ message }: IError) => {
  return (
    <span className="block pt-1 pl-2 font-medium text-red-600">{message}</span>
  );
};

// export const IsError = ({ message, button = 'Click Me' }: IError) => {
//   return (
//     <div className="w-full mx-auto mt-16 text-center">
//       <h1 className="text-2xl font-black md:text-3xl text-sl">{message}</h1>
//       {button && (
//         <Button variant="outline" className="mt-5" asChild>
//           <Link to="/" replace>
//             {button}
//           </Link>
//         </Button>
//       )}
//     </div>
//   );
// };
