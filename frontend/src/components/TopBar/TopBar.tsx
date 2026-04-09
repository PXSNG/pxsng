import { memo } from 'react';
import Logo from './Logo';
import CourseSearch from './CourseSearch';
import PersonalCorner from './PersonalCorner';
import { useSettings } from '@providers/SettingsProvider';

const TopBar = () => {
  const { theme } = useSettings();
  return (
    <div
      className="w-full h-16 flex items-center px-4 shadow-md fixed top-0 bg-topbar-light dark:bg-topbar-dark z-10"
      data-theme={theme}
    >
      <div className="flex items-center w-full">
        <div className="mr-8 flex items-center justify-center select-none cursor-pointer">
          <Logo width={48} height={48} />
        </div>
        <div className="flex-1 grow max-w-4xl mx-auto">
          <CourseSearch />
        </div>
        <div className="ml-8 flex items-center justify-center">
          <PersonalCorner />
        </div>
      </div>
    </div>
  );
};

export default memo(TopBar);
