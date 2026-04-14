import { useSettings } from '@providers/SettingsProvider';
import { memo, useCallback } from 'react';

export interface CourseType {
  name: string;
  description: string;
  image?: string;
  price: number;
}

interface CourseProps {
  course: CourseType;
  width?: number;
  height?: number;
  onClick?: (course: CourseType) => void;
}

const Course = ({ course, width, height, onClick }: CourseProps) => {
  const { theme } = useSettings();
  const handleClick = useCallback(() => {
    onClick?.(course);
  }, [onClick, course]);

  return (
    <div
      onClick={handleClick}
      style={{ width, height }}
      draggable={false}
      className=" p-4 border rounded-lg shadow-md cursor-pointer select-none hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative w-full h-full group">
        <div className="w-full h-full bg-gray-200 rounded-md mb-4 overflow-hidden absolute">
          <img
            className="rounded-md object-cover w-full h-full z-10 group-hover:scale-105 transition-transform duration-300"
            draggable={false}
            src={'/pxsng.svg'}
            alt={course.name}
            width={width || 200}
            height={height || 200}
          />
        </div>
        <div className="bottom-0 h-1/2 rounded-md absolute p-3 w-full flex flex-col justify-end group-hover:bg-linear-to-t group-hover:from-secondary-topbar/90 group-hover:to-secondary-topbar/0">
          <div
            className="text-xl font-bold text-font-light truncate transition-colors duration-300"
            data-theme={theme}
          >
            {course.name}
          </div>
          <div
            className="group-hover:block hidden truncate text-sm mt-1 text-font-light"
            data-theme={theme}
          >
            {course.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Course);
