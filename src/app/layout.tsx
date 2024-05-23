import { type Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider, Toaster } from '@/components';

import '@/styles/globals.css';

interface Props {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Firebase Web App',
  description: 'Starter web app | Next.js + Firebase',
  icons: {
    icon: '/favicon.ico',
  },
};

const RootLayout = ({ children }: Props): JSX.Element => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
