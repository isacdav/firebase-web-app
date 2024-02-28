'use client';

import { type NextPage } from 'next';

import { useAuthentication } from '@/hooks';

const Register: NextPage = () => {
  const { register } = useAuthentication();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = event.target;

    await register(email.value, password.value);
  };

  return (
    <main>
      <h1>Register</h1>
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

        <button type="submit">Do Signup</button>
      </form>
    </main>
  );
};

export default Register;
