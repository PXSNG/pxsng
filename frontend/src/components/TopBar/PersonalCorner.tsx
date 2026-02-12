import { Sunny } from '@mui/icons-material';
import { usePlatform } from '@providers/PlatformProvider';
import { memo } from 'react';

interface PersonalCornerProps {
  user?: unknown;
}

const PersonalCorner = ({ user }: PersonalCornerProps) => {
  const { isMobile } = usePlatform();

  return (
    <div className="flex items-center">
      {isMobile ? null : (
        <div className="mr-4">
          <div className="rounded-full  bg-secondary-topbar dark:bg-secondary-topbar p-2">
            <Sunny className="text-white" />
          </div>
        </div>
      )}
      <div>
        <div className="border-yellow-400 border-2 rounded-lg px-2 py-1 flex items-center">
          <span>500</span>
          <span className="ml-1 text-sm text-yellow-400">PXS</span>
        </div>
      </div>

      <div>
        <div className="ml-4 rounded-full bg-secondary-topbar dark:bg-secondary-topbar w-10 h-10 flex items-center justify-center">
          <span className="text-white">S</span>
        </div>
      </div>
    </div>
  );
};

export default memo(PersonalCorner);
