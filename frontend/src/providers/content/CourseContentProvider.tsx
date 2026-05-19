import { CourseType } from '@components/Course/Course';
import { getCourses } from '@services/courseService';
import { ReactNode, useState, useMemo, use, createContext, useEffect, useCallback } from 'react';

interface CourseContextType {
  courses: CourseType[] | null;
  setCourses: (courses: CourseType[] | null) => void;
}

export const CourseContext = createContext<CourseContextType | undefined>(undefined);

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider = ({ children }: CourseProviderProps) => {
  const [courses, setCourses] = useState<CourseType[] | null>(null);

  const refreshCourseData = useCallback(async () => {
    const courseData = await getCourses();
    setCourses(courseData);
    return courseData;
  }, []);

  useEffect(() => {
    refreshCourseData();
  }, []);

  const value = useMemo(() => ({ courses, setCourses }), [courses]);

  return <CourseContext value={value}>{children}</CourseContext>;
};

export const useCourse = () => {
  const context = use(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }

  return context;
};

export default CourseProvider;
