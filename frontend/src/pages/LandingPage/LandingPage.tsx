import { lazy, memo } from 'react';
import { Person, Star, TrendingUp } from '@mui/icons-material';
import { useCourse } from '@providers/content/CourseContentProvider';

const CourseCategory = lazy(() => import('./CourseCategory'));

const LandingPage = () => {
  const { courses } = useCourse();

  return (
    <div className="p-6 space-y-8 overflow-y-auto justify-center  flex flex-col ">
      <CourseCategory title="Featured" courses={courses} icon={<Star />} />
      <CourseCategory title="For you" courses={courses} icon={<Person />} />
      <CourseCategory title="Trending" courses={courses} icon={<TrendingUp />} />
    </div>
  );
};

export default memo(LandingPage);
