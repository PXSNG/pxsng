import { memo } from 'react';
import SearchBar from '@components/SearchBar/SearchBar';
import { Add } from '@mui/icons-material';
import { usePlatform } from '@providers/PlatformProvider';

const CourseSearch = () => {
  const { isMobile } = usePlatform();

  return (
    <div className="w-full flex flex-row items-center">
      <div className="flex-1 grow">
        <SearchBar />
      </div>

      {isMobile ? null : (
        <div className="ml-2 flex items-center">
          <div className="flex items-center p-2.5 bg-secondary-topbar dark:bg-secondary-topbar rounded-full cursor-pointer">
            <Add className="text-gray-500" />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(CourseSearch);
