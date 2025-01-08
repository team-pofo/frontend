export interface IUserData {
  id: number;
  username: string;
  email: string;
  role: string;
  // avatarUrl: string | null;
}

export interface IUser {
  success: boolean;
  data: IUserData | null;
}
