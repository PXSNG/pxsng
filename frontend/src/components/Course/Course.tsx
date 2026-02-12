import { memo, useCallback } from 'react';

export type CourseType = {
  name: string;
  description: string;
  image?: string;
  price: number;
};

interface CourseProps {
  course: CourseType;
  width?: number;
  height?: number;
  onClick?: (course: CourseType) => void;
}

const Course = ({ course, width, height, onClick }: CourseProps) => {
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
            className="rounded-md  object-cover w-full h-full z-0 group-hover:scale-105 transition-transform duration-300"
            draggable={false}
            src={course?.image ?? '/pxsng.svg'}
            alt="Course Placeholder"
            width={width || 200}
            height={height || 200}
          />
        </div>
        <div className="bottom-0 h-1/2 group-hover:bg-secondary-topbar group-hover:mask-t-from-0% group-hover:mask-t-to-100% rounded-md absolute p-3 w-full flex flex-col justify-end">
          <div className="text-xl font-bold text-gray-900  group-hover:text-gray-100 truncate">
            {course.name}
          </div>
          <div className="group-hover:block hidden text-gray-300 truncate text-sm mt-1">
            {course.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Course);
