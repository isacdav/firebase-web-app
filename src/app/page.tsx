import admin from 'firebase-admin';
import { cookies } from 'next/headers';

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

export default Home;
