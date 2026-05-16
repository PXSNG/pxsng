import { BACKEND_URL } from '@services';

export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/current_user`);

    if (!response.ok) {
      throw new Error(`Error fetching user data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return data as UserData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
};
