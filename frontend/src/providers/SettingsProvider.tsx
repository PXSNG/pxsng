import { ReactNode, useState, useMemo, use, createContext, useEffect } from 'react';

interface SettingsContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>({
  theme: 'light',
  toggleTheme: () => {
    /* empty */
  },
});

interface SettingsProviderProps {
  children: ReactNode;
}

export interface Settings {
  theme: 'light' | 'dark';
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveIntoLocalStorage({ theme: newTheme });
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const saveIntoLocalStorage = (setting: Partial<Settings>) => {
    try {
      const data = localStorage.getItem('pxsng_settings');
      if (data) {
        const existingSettings = JSON.parse(data);
        setting = { ...existingSettings, ...setting };
      }
      localStorage.setItem('pxsng_settings', JSON.stringify(setting));
    } catch (error) {
      console.error('Failed to save theme to localStorage:', error);
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const storedData = localStorage.getItem('pxsng_settings');
      if (storedData) {
        const settings = JSON.parse(storedData);
        if (settings.theme === 'light' || settings.theme === 'dark') {
          setTheme(settings.theme);
        }
      }
    } catch (error) {
      console.error('Failed to load theme from localStorage:', error);
    }
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <SettingsContext value={value}>{children}</SettingsContext>;
};

export const useSettings = () => {
  const context = use(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return context;
};

export default SettingsProvider;
