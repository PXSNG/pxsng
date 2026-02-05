import useWindowSize from '@hooks/useWindowSize';
import { use, createContext, ReactNode, useMemo } from 'react';

interface PlatformContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

interface PlatformProviderProps {
  children: ReactNode;
}

export const PlatformProvider = ({ children }: PlatformProviderProps) => {
  const size = useWindowSize();

  const isMobile = useMemo(() => {
    return size.width <= 768;
  }, [size]);

  const isTablet = useMemo(() => {
    return size.width > 768 && size.width <= 1024;
  }, [size]);

  const isDesktop = useMemo(() => {
    return size.width > 1024;
  }, [size]);

  return <PlatformContext value={{ isMobile, isTablet, isDesktop }}>{children}</PlatformContext>;
};

export const usePlatform = () => {
  const context = use(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }

  return context;
};

export default PlatformProvider;
