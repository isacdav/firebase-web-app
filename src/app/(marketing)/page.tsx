import { Atom, Flame, Plus } from 'lucide-react';
import { type NextPage } from 'next';

import { ThemeToggle } from '@/components';
import { Typography } from '@/ui';

const LandingPage: NextPage = () => {
  return (
    <main className="h-screen items-center justify-items-center pt-[10vh]">
      <div className="absolute right-2 top-2">
        <ThemeToggle />
      </div>

      <div className="flex flex-col items-center space-y-1">
        <div className="mb-3 flex items-center space-x-3">
          <Flame className="h-16 w-16 text-primary" />
          <Plus className="h-8 w-8 text-primary" />
          <Atom className="h-16 w-16 text-primary" />
        </div>
        <Typography variant="h3">Firebase Web App</Typography>
        <Typography variant="mutedText">Start building your web app with Firebase and Next.js</Typography>
      </div>
    </main>
  );
};

export default LandingPage;
