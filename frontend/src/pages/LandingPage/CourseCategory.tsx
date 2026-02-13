import { memo } from 'react';

import Carousel from '@components/Carousel/Carousel';
import Course, { CourseType } from '@components/Course/Course';

interface CourseCategoryProps {
  title: string;
  icon?: React.ReactNode;
  courses: CourseType[];
}

const CourseCategory = ({ title, icon, courses }: CourseCategoryProps) => {
  return (
    <>
      <div
        style={{ backgroundColor: '#F1ED38', color: '#333' }}
        className="select-none rounded-4xl ml-2 text-2xl font-bold mb-2 outline w-fit px-4 py-2 flex items-center space-x-2"
      >
        {icon}
        <span>{title}</span>
      </div>

      <Carousel>
        {courses.map((course, index) => (
          <Course key={course?.name || index} course={course} width={400} height={250} />
        ))}
      </Carousel>
    </>
  );
};

export default memo(CourseCategory);
