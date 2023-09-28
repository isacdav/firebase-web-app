import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Providers from '@/app/providers';

import './globals.css';

interface Props {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Side web boilerplate',
  description: 'A boilerplate for side projects frontend SSR',
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
