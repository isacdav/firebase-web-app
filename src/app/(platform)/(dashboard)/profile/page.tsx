import { type NextPage } from 'next';

const ProfilePage: NextPage = () => {
  return (
    <main>
      <h1>Profile</h1>
      <p>{JSON.stringify({ a: 1 })}</p>
    </main>
  );
};

export default ProfilePage;
