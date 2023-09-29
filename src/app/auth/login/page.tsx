'use client';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from 'reactfire';

const Login = () => {
  const auth = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = event.target;

    await signInWithEmailAndPassword(auth, email.value, password.value);
  };

  // TODO: UI just for testing
  return (
    <main>
      <h1>Login</h1>
      <br />

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <br />

        <input type="email" name="email" id="email" />
        <br />
        <label htmlFor="password">Password</label>
        <br />

        <input type="password" name="password" id="password" />
        <br />
        <br />

        <button type="submit">Do Login</button>
      </form>
    </main>
  );
};

export default Login;
