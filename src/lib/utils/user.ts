export interface User {
  id: number;
  nickname: string;
  email: string;
  kakao_id: string;
  steam_id: string;
  role: number;
  is_active: boolean;
  tk_users: any[];
  block_histories: any[];
}

const USER_KEY = "user_info";

export const saveUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const clearUser = (): void => {
  localStorage.removeItem(USER_KEY);
};
