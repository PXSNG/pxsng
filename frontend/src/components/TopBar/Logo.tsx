import { usePlatform } from '@providers/PlatformProvider';
import { memo } from 'react';

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo = ({ width, height }: LogoProps) => {
  const { isMobile } = usePlatform();

  if (isMobile) {
    return (
      <img
        draggable={false}
        className="select-none w-12 h-12 rounded-full"
        src="/pxsng.svg"
        alt="PXSNG Logo"
        title="PXSNG"
        width={width}
        height={height}
      />
    );
  }

  return (
    <div className="flex flex-row items-center">
      <img
        draggable={false}
        className="select-none"
        src="/pxsng.svg"
        alt="PXSNG Logo"
        width={width}
        height={height}
        title="PXSNG"
      />
      <p className="text-2xl font-bold ml-2">PXSNG</p>
    </div>
  );
};

export default memo(Logo);
