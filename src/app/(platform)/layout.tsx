import { PropsWithChildren } from 'react';

import { NextPage } from 'next';

import Providers from '@/app/(platform)/providers';

const PlatformLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return <Providers>{children}</Providers>;
};

export default PlatformLayout;
