import { memo } from 'react';
import Logo from './Logo';
import CourseSearch from './CourseSearch';
import PersonalCorner from './PersonalCorner';

const TopBar = () => {
  return (
    <div className="w-full h-16 flex items-center px-4 shadow-md fixed top-0 bg-topbar z-10">
      <div className="flex items-center w-full">
        <div className="mr-8 flex items-center">
          <Logo width={48} height={48} />
        </div>
        <div className="flex-1 grow">
          <CourseSearch />
        </div>
        <div className="ml-8 flex items-center">
          <PersonalCorner />
        </div>
      </div>
    </div>
  );
};

export default memo(TopBar);
