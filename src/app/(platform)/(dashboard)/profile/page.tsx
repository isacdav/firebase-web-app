'use client';

import { type NextPage } from 'next';

import { useAuthContext } from '@/context/authContext';
import { useAuthentication } from '@/hooks';
import { Button } from '@/ui';

const ProfilePage: NextPage = () => {
  const { signout } = useAuthentication();
  const { user } = useAuthContext();

  return (
    <main>
      <h1>Profile</h1>
      <p>{user?.displayName}</p>
      <p>{user?.email}</p>
      <p>{user?.phoneNumber}</p>

      <Button
        onClick={() => {
          signout();
        }}
      >
        Sign out
      </Button>
    </main>
  );
};

export default ProfilePage;
