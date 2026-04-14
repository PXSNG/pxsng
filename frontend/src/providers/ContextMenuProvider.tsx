import {
  createContext,
  use,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { createPortal } from 'react-dom';
import { usePlatform } from './PlatformProvider';
import { ContextMenuItem } from '@components/common/ContextMenuEntry/ContextMenuEntry';
import { useBackHandler } from '@hooks/useBackHandler';

import ErrorBoundary from '@components/common/ErrorBoundary/ErrorBoundary';
import ContextMenuEntryList from '@components/common/ContextMenuEntry/ContextMenuEntryList';
import { useSettings } from './SettingsProvider';

const ContextMenuContext = createContext<{
  showContextMenu: (e: MouseEvent | null, items: ContextMenuItem[]) => void;
  closeContextMenu: () => void;
} | null>(null);

interface ContextMenuProviderProps {
  children: React.ReactNode;
}

const ContextMenuProvider = ({ children }: ContextMenuProviderProps) => {
  const { isMobile } = usePlatform();
  const { theme } = useSettings();
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [menuItems, setMenuItems] = useState<ContextMenuItem[] | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const closeContextMenu = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsRendered(false);
    }, 300);
  }, []);

  const handleContextMenu = useCallback((e: MouseEvent | null, items: ContextMenuItem[]) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (window.getSelection) {
      window.getSelection()?.removeAllRanges();
    }

    const clickX = e ? e.clientX : 0;
    const clickY = e ? e.clientY : 0;

    setClickPosition({ x: clickX, y: clickY });
    setMenuItems(items);
    setIsRendered(true);

    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setIsVisible(true);
      }),
    );
  }, []);

  useLayoutEffect(() => {
    if (isRendered && menuRef.current && !isMobile && clickPosition) {
      const el = menuRef.current;
      const { offsetWidth: rootW, offsetHeight: rootH } = el;
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;

      const { x, y } = clickPosition;

      const rightOverflow = x + rootW > screenW;
      const bottomOverflow = y + rootH > screenH;

      const finalX = rightOverflow ? x - rootW : x;
      const finalY = bottomOverflow ? y - rootH : y;

      el.style.left = `${finalX}px`;
      el.style.top = `${finalY}px`;
    }
  }, [isRendered, isMobile, clickPosition, menuItems]);

  useEffect(() => {
    if (!isVisible) return;

    const handleClick = () => isVisible && closeContextMenu();
    const handleResize = () => isVisible && closeContextMenu();
    const handleScroll = () => isVisible && closeContextMenu();
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isVisible) closeContextMenu();
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('contextmenu', handleClick);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('contextmenu', handleClick);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible, closeContextMenu]);

  const contextValue = useMemo(
    () => ({
      showContextMenu: handleContextMenu,
      closeContextMenu,
    }),
    [handleContextMenu, closeContextMenu],
  );

  const styles = {
    mobile: {
      container: `absolute h-fit z-70  rounded-t-xl shadow-2xl p-4 pb-8
        transform transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}`,
    },
    desktop: {
      container:
        'fixed z-70 min-w-[180px] max-w-[300px] border  rounded-lg shadow-lg p-1 animate-in fade-in zoom-in-95 duration-100',
    },
  };

  const handleDefaultContextMenu = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleClick = useCallback((e) => {
    e?.stopPropagation();
  }, []);

  useBackHandler(isVisible, closeContextMenu);

  return (
    <ErrorBoundary>
      <ContextMenuContext value={contextValue}>
        {isRendered &&
          createPortal(
            <div
              id="context-menu-backdrop"
              className={`z-60 fixed top-0 left-0 w-dvw h-dvh
              ${isMobile ? (isVisible ? 'bg-black/60 backdrop-blur-[2px] opacity-100' : 'bg-black/0 opacity-0') : ''}`}
            >
              <div
                ref={menuRef}
                style={
                  isMobile
                    ? { bottom: 0, left: 0, width: '100%' }
                    : {
                        position: 'fixed',
                        opacity: isVisible ? 1 : 0,
                      }
                }
                className={
                  styles[isMobile ? 'mobile' : 'desktop'].container +
                  ' bg-secondary-light dark:bg-secondary-dark'
                }
                data-theme={theme}
                onClick={handleClick}
                onContextMenu={handleDefaultContextMenu}
              >
                <ContextMenuEntryList items={menuItems || []} isMobile={isMobile} />
              </div>
            </div>,
            document.body,
          )}
        {children}
      </ContextMenuContext>
    </ErrorBoundary>
  );
};

export const useContextMenu = () => {
  const context = use(ContextMenuContext);
  if (!context) {
    throw new Error('useContextMenu must be used within a ContextMenuProvider');
  }
  return context;
};

export default ContextMenuProvider;
