import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  verifyPasswordResetCode,
  type ActionCodeSettings,
} from 'firebase/auth';

import { userCreate } from '@/actions';
import { useAction, useFirebase } from '@/hooks';
import { forgotPasswordURL } from '@/lib/config';

interface AuthResult {
  success: boolean;
  errorMessage?: string;
}

/**
 * Hook to handle authentication actions
 * @returns The authentication actions for signin, signout, register, etc
 */
export function useAuthentication() {
  const { auth } = useFirebase();
  const { execute } = useAction(userCreate);

  async function signin(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function signout() {
    return signOut(auth);
  }

  async function register(email: string, password: string) {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    await execute({
      uid: user?.uid ?? '',
      email: user?.email ?? '',
    });
  }

  async function forgotPassword(email: string) {
    const options: ActionCodeSettings = {
      url: forgotPasswordURL,
    };

    return sendPasswordResetEmail(auth, email, options);
  }

  async function resetPassword(password: string, oobCode: string) {
    return confirmPasswordReset(auth, oobCode, password);
  }

  async function verifyOobCode(oobCode: string): Promise<Boolean> {
    try {
      await verifyPasswordResetCode(auth, oobCode);
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
    resetPassword,
    verifyOobCode,
  } as const;
}
