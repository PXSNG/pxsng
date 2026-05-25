import { ModeNight, Sunny } from '@mui/icons-material';
import { useContextMenu } from '@providers/ContextMenuProvider';
import { usePlatform } from '@providers/PlatformProvider';
import { useSettings } from '@providers/SettingsProvider';
import { useCurrentUser } from '@providers/content/CurrentUserProvider';
import { memo, useCallback, useMemo } from 'react';

const PersonalCorner = () => {
  const { theme, toggleTheme: settingsToggleTheme } = useSettings();
  const { isMobile } = usePlatform();
  const { currentUser } = useCurrentUser();
  const { showContextMenu } = useContextMenu();

  const toggleTheme = useCallback(() => {
    settingsToggleTheme();
  }, [theme, settingsToggleTheme]);

  const userInitial = useMemo(
    () => currentUser?.firstname?.charAt(0)?.toUpperCase() ?? '?',
    [currentUser],
  );
  const userPoints = useMemo(() => currentUser?.coin_balance ?? 0, [currentUser]);

  const handleProfileClick = useCallback(
    (e) => {
      showContextMenu(e, [
        {
          label: 'Profile',
          onClick: () => {
            console.log('Go to profile');
          },
        },
        {
          label: 'Settings',
          onClick: () => {
            console.log('Go to settings');
          },
        },
        {
          label: '---',
          variant: 'separator',
        },
        {
          label: `My Points: ${userPoints}`,
        },
        {
          label: '---',
          variant: 'separator',
        },
        {
          label: 'Logout',
          variant: 'danger',
          onClick: () => {
            console.log('Logout');
          },
        },
      ]);
    },
    [showContextMenu, userPoints],
  );

  return (
    <div className="flex items-center">
      <div className="mr-4 flex items-center justify-center select-none cursor-pointer">
        <div
          title={`${userPoints} PXS`}
          className="border-yellow-400 border-2 rounded-lg px-2 py-1 flex items-center max-w-24 select-none"
        >
          <span className="truncate">{userPoints}</span>
          <span className="ml-1 text-sm text-yellow-400 font-bold">PXS</span>
        </div>
      </div>
      {!isMobile && (
        <div className="">
          <div
            className="rounded-full bg-secondary-topbar-light dark:bg-secondary-topbar-dark p-3 flex items-center justify-center cursor-pointer select-none hover:ring-2 hover:ring-yellow-400 transition-all duration-200"
            onClick={toggleTheme}
            data-theme={theme}
          >
            {theme === 'light' ? (
              <Sunny className="text-gray-500" />
            ) : (
              <ModeNight className="text-white" />
            )}
          </div>
        </div>
      )}

      <div
        onClick={handleProfileClick}
        className="ml-4 rounded-full bg-secondary-topbar-light dark:bg-secondary-topbar-dark w-12 h-12 flex items-center justify-center cursor-pointer select-none hover:ring-2 hover:ring-yellow-400 transition-all duration-200"
        data-theme={theme}
      >
        <span className="text-font-light dark:text-font-dark" data-theme={theme}>
          {userInitial}
        </span>
      </div>
    </div>
  );
};

export default memo(PersonalCorner);
