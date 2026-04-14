import { memo } from 'react';

import Carousel from '@components/common/Carousel/Carousel';
import Course, { CourseType } from '@components/Course/Course';

interface CourseCategoryProps {
  title: string;
  icon?: React.ReactNode;
  courses: CourseType[];
}

const CourseCategory = ({ title, icon, courses }: CourseCategoryProps) => {
  if (!courses || courses.length === 0) return null;

  return (
    <section className="w-full mb-8" aria-label={title}>
      <h2 className="bg-[#F1ED38] text-[#333] select-none rounded-4xl ml-2 text-2xl font-bold mb-2 outline w-fit px-4 py-2 flex items-center space-x-2">
        {icon}
        <span>{title}</span>
      </h2>

      <Carousel>
        {courses.map((course, index) => (
          <Course key={course?.name || index} course={course} width={400} height={250} />
        ))}
      </Carousel>
    </section>
  );
};

export default memo(CourseCategory);
