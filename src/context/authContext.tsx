import { createContext, useContext, useEffect, useState } from 'react';

import { onIdTokenChanged, type User } from 'firebase/auth';
import { useCookies } from 'react-cookie';

import { useFirebase } from '@/hooks';
import { envSecureCookie } from '@/lib/config';
import { COOKIE_SESSION } from '@/lib/constants';

interface AuthContextState {
  user: User | undefined;
  loading?: boolean;
}

const AuthContext = createContext<AuthContextState>({ user: undefined });

export const AuthContextProvider = ({ children }: any): JSX.Element => {
  const { auth } = useFirebase();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [, setCookie, removeCookie] = useCookies([COOKIE_SESSION]);

  useEffect(() => {
    const unsuscribe = onIdTokenChanged(auth, async user => {
      if (!user) {
        setUser(undefined);

        removeCookie(COOKIE_SESSION);
      } else {
        const token = await user.getIdToken();
        setUser(user);

        setCookie(COOKIE_SESSION, token, { path: '/', secure: envSecureCookie });
      }

      setLoading(false);
    });

    return () => {
      unsuscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>{loading ? <p>Loading...</p> : children}</AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextState => useContext(AuthContext);
