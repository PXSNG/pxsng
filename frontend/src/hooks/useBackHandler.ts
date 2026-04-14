import { use, useEffect, useId } from 'react';
import { BackHandlerContext } from '../providers/BackhandlerProvider';

export const useBackHandler = (isActive: boolean, onBack: () => void, timeout?: number) => {
  const { register, unregister } = use(BackHandlerContext);

  const id = useId();

  useEffect(() => {
    if (!isActive) return;
    register(id, onBack, timeout);
    return () => {
      unregister(id);
    };
  }, [isActive, onBack, register, unregister, id, timeout]);
};
