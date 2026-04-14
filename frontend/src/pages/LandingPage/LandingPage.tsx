import { lazy, memo } from 'react';
import { Person, Star, TrendingUp } from '@mui/icons-material';

const CourseCategory = lazy(() => import('./CourseCategory'));

const courses = [
  {
    name: 'React for Beginners',
    description: 'Learn the basics of React and build your first web application.',
    image: '/course1.jpg',
    price: 49.99,
  },
  {
    name: 'Advanced JavaScript',
    description: 'Master advanced JavaScript concepts and techniques.',
    image: '/course2.jpg',
    price: 59.99,
  },
  {
    name: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of UI/UX design and create stunning interfaces.',
    image: '/course3.jpg',
    price: 39.99,
  },
  {
    name: 'Managing Jealousy in the Workplace',
    description: 'Learn how to manage jealousy in professional settings.',
    image: '/course4.jpg',
    price: 39.99,
  },
];

const LandingPage = () => {
  return (
    <div className="p-6 space-y-8 overflow-y-auto justify-center  flex flex-col ">
      <CourseCategory title="Featured" courses={courses} icon={<Star />} />
      <CourseCategory title="For you" courses={courses} icon={<Person />} />
      <CourseCategory title="Trending" courses={courses} icon={<TrendingUp />} />
    </div>
  );
};

export default memo(LandingPage);
