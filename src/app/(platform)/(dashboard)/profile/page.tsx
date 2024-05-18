'use client';

import { type NextPage } from 'next';

import { useAuthContext } from '@/context/authContext';

const ProfilePage: NextPage = () => {
  const { user } = useAuthContext();

  return (
    <main>
      <h1>Profile</h1>
      <p>{user?.displayName}</p>
      <p>{user?.email}</p>
      <p>{user?.phoneNumber}</p>
    </main>
  );
};

export default ProfilePage;
