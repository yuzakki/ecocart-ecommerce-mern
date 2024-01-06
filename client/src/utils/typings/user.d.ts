export interface IUser {
  _id: string;
  email: string;
  password: string;
  passwordConfirm?: string | undefined;
  name: string;
  photo: string;
  role: 'user' | 'admin';
  phone: number;
  country: string;
}
