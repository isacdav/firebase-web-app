'use client';

import { type NextPage } from 'next';
import { useFormState, useFormStatus } from 'react-dom';

import { useAuthentication } from '@/hooks';

const Login: NextPage = () => {
  const { signin } = useAuthentication();
  const { pending } = useFormStatus();

  const handleSubmit = (_prevState: any, formData: FormData): void => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    signin(email, password);
  };

  const [, formAction] = useFormState<any, FormData>(handleSubmit, undefined);

  return (
    <main>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            Login
          </a>

          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Enter your credentials
              </h1>

              <form className="space-y-4 md:space-y-6" action={formAction}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Email
                  </label>
                  <input
                    required
                    id="email"
                    type="email"
                    name="email"
                    placeholder="name@mail.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <input
                    required
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-red-300"
                        required={false}
                      />
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-500">
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-red-600 hover:underline ">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500">
                  Don&apos;t have an account yet?
                  <a href="#" className="font-medium text-red-600 hover:underline ml-2">
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
