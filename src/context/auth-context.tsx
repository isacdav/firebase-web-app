'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { onIdTokenChanged, type User } from 'firebase/auth';
import { useAuth } from 'reactfire';

import { API_AUTH_LOGIN, API_AUTH_SIGNOUT } from '@/constants/api';

interface AuthContextState {
  user: User | undefined;
  loading?: boolean;
}

const AuthContext = createContext<AuthContextState>({ user: undefined });

export const AuthContextProvider = ({ children }: any): JSX.Element => {
  const auth = useAuth();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>(undefined);

  /**
   * Set user when the auth state changes
   * Saves token for SSR
   */
  useEffect(() => {
    const unsuscribe = onIdTokenChanged(auth, async user => {
      if (!user) {
        setUser(undefined);

        fetch(API_AUTH_SIGNOUT, { method: 'POST' });
      } else {
        const token = await user.getIdToken();
        setUser(user);

        fetch(API_AUTH_LOGIN, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setMounted(true);
    });

    return () => {
      unsuscribe();
    };
  }, []);

  /**
   * Set loading to false when the component is mounted
   */
  useEffect(() => {
    if (mounted) {
      setLoading(false);
    }
  }, [mounted]);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextState => useContext(AuthContext);
