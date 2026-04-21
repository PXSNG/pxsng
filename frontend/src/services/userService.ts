const BACKEND_URL = process.env?.BACKEND_URL ?? 'http://backend:8080';

export const getUserData = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/users`);

    if (!response.ok) {
      throw new Error(`Error fetching user data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return data as User;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
};

export const getUserDataById = async (userId: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/users/${userId}`);

    if (!response.ok) {
      throw new Error(`Error fetching user data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return data as User;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
};
