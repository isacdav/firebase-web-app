'use client';

import { ReactNode, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Loader } from '@/components';
import { useAuthContext } from '@/context/authContext';

interface Props {
  children: ReactNode;
  redirectPath: string;
  isPublic: boolean;
}

export const RouteProtector = ({ children, redirectPath, isPublic }: Props) => {
  const { push } = useRouter();
  const { user } = useAuthContext();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isPublic && user) {
      push(redirectPath);
      setShouldRender(false);
    } else if (!isPublic && !user) {
      push(redirectPath);
      setShouldRender(false);
    } else {
      setShouldRender(true);
    }
  }, [user, isPublic, redirectPath]);

  return shouldRender ? <>{children}</> : <Loader fullScreen size="lg" />;
};
