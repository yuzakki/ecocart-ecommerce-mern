import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import './globals.css';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')! as HTMLElement).render(
  <>
    <App />
    <Toaster
      position="top-center"
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 4000,
        },
      }}
    />
  </>
);
