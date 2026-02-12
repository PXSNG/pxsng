import { memo, Suspense, lazy } from 'react';

const TopBar = lazy(() => import('@components/TopBar/TopBar'));
const LandingPage = lazy(() => import('@pages/LandingPage/LandingPage'));

const App = () => {
  return (
    <div className="w-dvw h-dvh bg-background overflow-x-hidden">
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
