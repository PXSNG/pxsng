import { getUserData } from '@services/userService';
import { ReactNode, useState, useMemo, use, createContext, useEffect } from 'react';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>({ name: 'Sammy', points: 500 } as User);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      setUser(userData);
    };

    fetchUserData();
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext value={value}>{children}</UserContext>;
};

export const useUser = () => {
  const context = use(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export default UserProvider;
