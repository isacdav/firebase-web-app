'use client';

import { Frown } from 'lucide-react';
import { type NextPage } from 'next';

import { Typography } from '@/ui';

const NotFound: NextPage = () => {
  return (
    <main className="h-screen items-center justify-items-center pt-[10vh]">
      <div className="flex flex-col items-center space-y-1">
        <Frown className="mb-4 h-16 w-16 text-primary" />
        <Typography variant="h3">Not found</Typography>
        <Typography variant="mutedText">The page you are looking for does not exist</Typography>
      </div>
    </main>
  );
};

export default NotFound;
