import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type ActionCodeSettings,
} from 'firebase/auth';

import { userCreate } from '@/actions';
import { useAction, useFirebase } from '@/hooks';
import { forgotPasswordURL } from '@/lib/config';

interface UseAuthenticationHook {
  signin: (email: string, password: string) => Promise<boolean>;
  signout: () => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
}

/**
 * Hook to handle authentication actions
 * @returns The authentication actions for signin, signout, and register
 */
export function useAuthentication(): UseAuthenticationHook {
  const { auth } = useFirebase();
  const { data: registerData, execute } = useAction(userCreate);

  async function signin(email: string, password: string): Promise<boolean> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      return false;
    }
  }

  async function signout(): Promise<boolean> {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      return false;
    }
  }

  async function register(email: string, password: string): Promise<boolean> {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      await execute({
        uid: user?.uid ?? '',
        email: user?.email ?? '',
      });

      return !!registerData;
    } catch (error) {
      return false;
    }
  }

  async function forgotPassword(email: string): Promise<boolean> {
    try {
      const options: ActionCodeSettings = {
        url: forgotPasswordURL,
      };

      await sendPasswordResetEmail(auth, email, options);
      return true;
    } catch (error) {
      return false;
    }
  }

  return {
    signin,
    signout,
    register,
    forgotPassword,
  };
}
