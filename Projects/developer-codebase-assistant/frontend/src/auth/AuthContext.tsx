import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { authApi, type SafeUser } from '../api/auth';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';
type AuthContextValue = {
  status: AuthStatus;
  user: SafeUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [user, setUser] = useState<SafeUser | null>(null);

  useEffect(() => {
    authApi.me().then(({ user: currentUser }) => {
      setUser(currentUser);
      setStatus('authenticated');
    }).catch(() => {
      setUser(null);
      setStatus('unauthenticated');
    });
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    status,
    user,
    login: async (email, password) => {
      const result = await authApi.login(email, password);
      setUser(result.user);
      setStatus('authenticated');
    },
    register: async (email, password) => {
      const result = await authApi.register(email, password);
      setUser(result.user);
      setStatus('authenticated');
    },
    logout: async () => {
      await authApi.logout();
      setUser(null);
      setStatus('unauthenticated');
    },
  }), [status, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider.');
  return context;
}
