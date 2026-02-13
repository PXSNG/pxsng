import { use, useLayoutEffect, useMemo, useState } from 'react';
import { createContext, ReactNode } from 'react';

interface GestureContextType {
  setupGestureDetection: (ref: React.RefObject<HTMLElement> | null) => {
    onSwipeLeft: (cb: () => void) => () => void;
    onSwipeRight: (cb: () => void) => () => void;
    onSwipeUp: (cb: () => void) => () => void;
    onSwipeDown: (cb: () => void) => () => void;
    onTap: (cb: () => void) => () => void;
    onLongPress: (cb: () => void) => () => void;
    cleanup: () => void;
  };
}

export const GestureContext = createContext<GestureContextType | undefined>(undefined);

interface GestureProviderProps {
  children: ReactNode;
}

export const GestureProvider = ({ children }: GestureProviderProps) => {
  const setupGestureDetection = (ref: React.RefObject<HTMLElement> | null) => {
    const handlersRef = {
      onSwipeLeft: new Set<() => void>(),
      onSwipeRight: new Set<() => void>(),
      onSwipeUp: new Set<() => void>(),
      onSwipeDown: new Set<() => void>(),
      onTap: new Set<() => void>(),
      onLongPress: new Set<() => void>(),
    };

    const element = ref?.current;
    if (!element) {
      return {
        onSwipeLeft: () => () => {
          /* empty */
        },
        onSwipeRight: () => () => {
          /* empty */
        },
        onSwipeUp: () => () => {
          /* empty */
        },
        onSwipeDown: () => () => {
          /* empty */
        },
        onTap: () => () => {
          /* empty */
        },
        onLongPress: () => () => {
          /* empty */
        },
        cleanup: () => {
          /* empty */
        },
      };
    }

    let startTime = 0;
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    const onPointerMove = (event: Event) => {
      const touch = (event as TouchEvent).touches
        ? (event as TouchEvent).touches[0]
        : (event as PointerEvent);
      endX = touch.clientX;
      endY = touch.clientY;
    };

    const onPointerUp = () => {
      const deltaX = endX - startX;
      const deltaY = endY - startY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 50) {
          handlersRef.onSwipeRight.forEach((cb) => cb());
        } else if (deltaX < -50) {
          handlersRef.onSwipeLeft.forEach((cb) => cb());
        }
      } else {
        if (deltaY > 50) {
          handlersRef.onSwipeDown.forEach((cb) => cb());
        } else if (deltaY < -50) {
          handlersRef.onSwipeUp.forEach((cb) => cb());
        }
      }

      const elapsedTime = Date.now() - startTime;

      if (elapsedTime < 300 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        handlersRef.onTap.forEach((cb) => cb());
      } else if (elapsedTime >= 500 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        handlersRef.onLongPress.forEach((cb) => cb());
      }

      element.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('pointerup', onPointerUp);
      element.removeEventListener('pointercancel', onPointerUp);
    };

    const onPointerDown = (event: Event) => {
      startTime = Date.now();
      const touch = (event as TouchEvent).touches
        ? (event as TouchEvent).touches[0]
        : (event as PointerEvent);
      startX = touch.clientX;
      startY = touch.clientY;
      endX = startX;
      endY = startY;

      element.addEventListener('pointermove', onPointerMove);
      element.addEventListener('pointerup', onPointerUp);
      element.addEventListener('pointercancel', onPointerUp);
    };

    element.addEventListener('pointerdown', onPointerDown);

    const cleanup = () => {
      element.removeEventListener('pointerdown', onPointerDown);
      element.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('pointerup', onPointerUp);
      element.removeEventListener('pointercancel', onPointerUp);
    };

    const createRegistration = (type: keyof typeof handlersRef) => {
      return (cb: () => void) => {
        handlersRef[type].add(cb);
        return () => {
          handlersRef[type].delete(cb);
        };
      };
    };

    return {
      onSwipeLeft: createRegistration('onSwipeLeft'),
      onSwipeRight: createRegistration('onSwipeRight'),
      onSwipeUp: createRegistration('onSwipeUp'),
      onSwipeDown: createRegistration('onSwipeDown'),
      onTap: createRegistration('onTap'),
      onLongPress: createRegistration('onLongPress'),
      cleanup,
    };
  };

  const contextValue = useMemo(() => ({ setupGestureDetection }), []);

  return <GestureContext value={contextValue}>{children}</GestureContext>;
};

export const useGestures = (ref: React.RefObject<HTMLElement | null>) => {
  const context = use(GestureContext);

  if (!context) {
    throw new Error('useGestures must be used within a GestureProvider');
  }

  const defaultHandlers = useMemo(
    () => ({
      onSwipeLeft: () => () => {
        /* empty */
      },
      onSwipeRight: () => () => {
        /* empty */
      },
      onSwipeUp: () => () => {
        /* empty */
      },
      onSwipeDown: () => () => {
        /* empty */
      },
      onTap: () => () => {
        /* empty */
      },
      onLongPress: () => () => {
        /* empty */
      },
      cleanup: () => {
        /* empty */
      },
    }),
    [],
  );

  const [handlers, setHandlers] =
    useState<ReturnType<typeof context.setupGestureDetection>>(defaultHandlers);

  const target = ref?.current;

  useLayoutEffect(() => {
    if (!target) {
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setHandlers(defaultHandlers);
      return undefined;
    }

    const nextHandlers = context.setupGestureDetection(ref as React.RefObject<HTMLElement>);
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setHandlers(nextHandlers);

    return () => {
      nextHandlers.cleanup();
      setHandlers(defaultHandlers);
    };
  }, [context, defaultHandlers, ref, target]);

  return handlers;
};
