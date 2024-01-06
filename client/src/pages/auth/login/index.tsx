import { LoginForm } from '@components/forms/login-form';
import { Logo } from '@assets/brand/logo';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8 px-4 full-page-gradient-bg">
      <Logo background="#fff" />
      <LoginForm />
    </div>
  );
}
