import { createContext, useContext, useEffect, useState } from 'react';

import { onIdTokenChanged, type User } from 'firebase/auth';
import { useAuth } from 'reactfire';

import { API_AUTH_LOGIN, API_AUTH_SIGNOUT } from '@/constants/api';

interface AuthContextState {
  user: User | undefined;
}

const AuthContext = createContext<AuthContextState>({ user: undefined });

export const AuthContextProvider = ({ children }: any): JSX.Element => {
  const auth = useAuth();
  const [user, setUser] = useState<User | undefined>(undefined);

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
    });

    return () => {
      unsuscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextState => useContext(AuthContext);
