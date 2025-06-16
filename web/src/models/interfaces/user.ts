export interface User {
  _id: string;
  email: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
