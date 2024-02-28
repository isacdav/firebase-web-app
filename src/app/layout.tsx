import { type Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';

interface Props {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Side web boilerplate',
  description: 'A boilerplate for side projects | Next.js + Firebase',
  icons: {
    icon: '/favicon.ico',
  },
};

const RootLayout = ({ children }: Props): JSX.Element => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
