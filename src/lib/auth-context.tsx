import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type UserRole = 'cfo' | 'treasurer' | 'controller';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  roleLabel: string;
  initials: string;
}

const USERS: Record<string, { password: string; user: User }> = {
  'sarah.miller': {
    password: 'cfo2024',
    user: { id: '1', name: 'Sarah Miller', role: 'cfo', roleLabel: 'Chief Financial Officer', initials: 'SM' },
  },
  'john.mcghee': {
    password: 'treasurer2024',
    user: { id: '2', name: 'John McGhee', role: 'treasurer', roleLabel: 'Treasurer', initials: 'JM' },
  },
  'lisa.mcdonald': {
    password: 'controller2024',
    user: { id: '3', name: 'Lisa McDonald', role: 'controller', roleLabel: 'Controller', initials: 'LM' },
  },
};

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = sessionStorage.getItem('guidant_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((username: string, password: string): string | null => {
    const entry = USERS[username.toLowerCase().trim()];
    if (!entry) return 'Invalid username';
    if (entry.password !== password) return 'Invalid password';
    setUser(entry.user);
    sessionStorage.setItem('guidant_user', JSON.stringify(entry.user));
    return null;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('guidant_user');
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
