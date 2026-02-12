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
        className="select-none"
        src="/pxsng.svg"
        alt="PXSNG Logo"
        width={width}
        height={height}
      />
    );
  }

  return (
    <div className="flex flex-row items-center">
      <img
        className="select-none"
        src="/pxsng.svg"
        alt="PXSNG Logo"
        width={width}
        height={height}
      />
      <p className="text-2xl font-bold ml-2">PXSNG</p>
    </div>
  );
};

export default memo(Logo);
