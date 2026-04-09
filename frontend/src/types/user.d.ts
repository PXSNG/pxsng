interface UserData {
  id: string;
  name: string;
  email: string;
  points: number;
  avatarUrl?: string;
}

interface User extends UserData {
  token: string;
}

interface UserSettings {
  theme: 'light' | 'dark';
}
