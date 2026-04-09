import { useSettings } from '@providers/SettingsProvider';
import { memo, Suspense, lazy } from 'react';

const TopBar = lazy(() => import('@components/TopBar/TopBar'));
const LandingPage = lazy(() => import('@pages/LandingPage/LandingPage'));

const App = () => {
  const { theme } = useSettings();
  return (
    <div
      className="w-dvw h-dvh bg-background-light overflow-x-hidden dark:bg-background-dark text-font-light dark:text-font-dark"
      data-theme={theme}
    >
      <Suspense fallback={<div />}>
        <div className="w-dvw h-16 relative z-20">
          <TopBar />
        </div>
        <div className="w-full h-fit relative z-10 pt-10 px-4 ">
          <LandingPage />
        </div>
      </Suspense>
    </div>
  );
};

export default memo(App);
