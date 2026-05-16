import { BACKEND_URL } from '@services';

export const getCourses = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/courses`);

    if (!response.ok) {
      throw new Error(`Error fetching course data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Failed to fetch course data:', error);
    return null;
  }
};
