import { getCurrentUser } from '@services/getCurrentUser';
import { ReactNode, useState, useMemo, use, createContext, useEffect, useCallback } from 'react';

interface CurrentUserContextType {
  currentUser: UserData | null;
  setCurrentUser: (user: UserData | null) => void;
}

export const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

interface CurrentUserProviderProps {
  children: ReactNode;
}

export const CurrentUserProvider = ({ children }: CurrentUserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  const refreshUserData = useCallback(async () => {
    const userData = await getCurrentUser();
    setCurrentUser(userData);
    return userData;
  }, []);

  useEffect(() => {
    refreshUserData();
  }, []);

  const value = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);

  return <CurrentUserContext value={value}>{children}</CurrentUserContext>;
};

export const useCurrentUser = () => {
  const context = use(CurrentUserContext);
  if (!context) {
    throw new Error('useCurrentUser must be used within a CurrentUserProvider');
  }

  return context;
};

export default CurrentUserProvider;
