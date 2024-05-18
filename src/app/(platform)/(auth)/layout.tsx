import { ThemeToggle } from '@/components';

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <div className="absolute right-2 top-2">
        <ThemeToggle />
      </div>
      {children}
    </>
  );
};

export default AuthLayout;
