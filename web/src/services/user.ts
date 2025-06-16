import { request } from '@/lib/request';
import { User } from '@/models/interfaces/user';

const login = async (email: string, password: string) =>
  await request.post<{ message: string }>('/auth/login', {
    email,
    password
  });

const getUser = async () => await request.get<User>('/user');

export const UserService = {
  login,
  getUser
};
