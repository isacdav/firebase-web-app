import { type NextPage } from 'next';

// export const getUserData = async () => {
//   const session = cookies().get('session')?.value ?? '';
//   if (session) {
//     const user = await admin.auth().verifySessionCookie(session, true);

//     const data = await admin.firestore().collection('users').doc(user.uid).get();
//     const userData = data.data();

//     return userData;
//   }

//   return {};
// };

const DashboardPage: NextPage = () => {
  // const a = await getUserData();

  return (
    <main>
      <h1>Profile</h1>
      <p>{JSON.stringify({ a: 1 })}</p>
    </main>
  );
};

export default DashboardPage;

// ya podria tomar datos de una bd
// aunque necesito crear el usuario en bd al registrarse
