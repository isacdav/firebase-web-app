import { cookies } from 'next/headers';

import { Protected } from '@/components';
import { admin } from '@/lib/firebase/admin';

export const getUserData = async () => {
  const session = cookies().get('session')?.value ?? '';

  if (session) {
    const user = await admin.auth().verifySessionCookie(session, true);

    const data = await admin.firestore().collection('users').doc(user.uid).get();
    const userData = data.data();

    return userData;
  }

  return {};
};

const Home = async () => {
  const a = await getUserData();

  return (
    <main>
      <h1>Home</h1>
      <p>{JSON.stringify(a)}</p>
    </main>
  );
};

const HomePage = () => {
  return (
    <Protected>
      <Home />
    </Protected>
  );
};

export default HomePage;
