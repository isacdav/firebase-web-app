import { PropsWithChildren } from 'react';

import { NextPage } from 'next';

import { ThemeToggle } from '@/components';

const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
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
