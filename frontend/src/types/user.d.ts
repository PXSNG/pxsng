interface UserData {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  coin_balance: number;
  avatarUrl?: string;
}

interface User extends UserData {
  token: string;
}

interface UserSettings {
  theme: 'light' | 'dark';
}
