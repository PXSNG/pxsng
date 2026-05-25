import { memo, useCallback } from 'react';
import SearchBar from '@components/SearchBar/SearchBar';
import { Add } from '@mui/icons-material';
import { usePlatform } from '@providers/PlatformProvider';
import { useSearch } from '@providers/SearchProvider';
import { useSettings } from '@providers/SettingsProvider';

const CourseSearch = () => {
  const { isMobile } = usePlatform();
  const { theme } = useSettings();
  const { query, setQuery } = useSearch();

  const handleSearchChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  return (
    <div className="w-full flex flex-row items-center">
      <div className="flex-1 grow">
        <SearchBar onChange={handleSearchChange} value={query} />
      </div>

      {!isMobile && (
        <div className="ml-2 flex items-center">
          <div
            data-theme={theme}
            className="flex items-center p-2.5 bg-secondary-topbar-light dark:bg-secondary-topbar-dark rounded-full cursor-pointer hover:ring-2 hover:ring-yellow-400 transition-all duration-200"
          >
            <Add className="text-secondary-light dark:text-secondary-dark" data-theme={theme} />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(CourseSearch);
