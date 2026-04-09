import { createContext, use, useCallback, useEffect, useRef, type ReactNode } from 'react';

type BackCallback = () => void;

interface BackHandlerEntry {
  id: string;
  callback: BackCallback;
  timeout: number;
}

interface BackHandlerProvider {
  register: (id: string, callback: BackCallback, timeout?: number) => void;
  unregister: (id: string) => void;
}

export const BackHandlerContext = createContext<BackHandlerProvider>({
  register: () => {
    /* empty */
  },
  unregister: () => {
    /* empty */
  },
});

export const BackHandlerProvider = ({ children }: { children: ReactNode }) => {
  const stackRef = useRef<BackHandlerEntry[]>([]);
  const beforeUnloadAttachedRef = useRef(false);
  const resetTimerRef = useRef<number | null>(null);

  const beforeUnloadHandler = useCallback((e: BeforeUnloadEvent) => {
    e.preventDefault();
  }, []);

  const detachBeforeUnload = useCallback(() => {
    if (stackRef.current.length === 0 && beforeUnloadAttachedRef.current) {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      beforeUnloadAttachedRef.current = false;
    }
  }, [beforeUnloadHandler]);

  const register = useCallback(
    (id: string, callback: BackCallback, timeout = 80) => {
      if (stackRef.current.some((entry) => entry.id === id)) return;

      stackRef.current.push({ id, callback, timeout });
      window.history.pushState({ handlerId: id }, '', '');

      if (!beforeUnloadAttachedRef.current) {
        window.addEventListener('beforeunload', beforeUnloadHandler);
        beforeUnloadAttachedRef.current = true;
      }
    },
    [beforeUnloadHandler],
  );

  const unregister = useCallback(
    (id: string) => {
      const index = stackRef.current.findIndex((entry) => entry.id === id);
      if (index === -1) return;

      stackRef.current.splice(index, 1);
      detachBeforeUnload();
    },
    [detachBeforeUnload],
  );

  useEffect(() => {
    const handlePopState = () => {
      if (stackRef.current.length === 0) return;

      const entry = stackRef.current.pop();
      detachBeforeUnload();

      if (!entry) return;

      entry.callback();

      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }

      resetTimerRef.current = window.setTimeout(() => {
        resetTimerRef.current = null;
      }, entry.timeout ?? 80);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      beforeUnloadAttachedRef.current = false;

      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, [beforeUnloadHandler, detachBeforeUnload]);

  return <BackHandlerContext value={{ register, unregister }}>{children}</BackHandlerContext>;
};

export const useBackHandler = () => {
  const context = use(BackHandlerContext);
  if (!context) {
    throw new Error('useBackHandler must be used within a BackHandlerProvider');
  }
  return context;
};

export default BackHandlerProvider;
