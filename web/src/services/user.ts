import request from '@/lib/request';
import { User, UserCreate } from '@/models/interfaces/user';

const login = async (email: string, password: string) =>
  await request.post<{ message: string }>('/auth/login', {
    email,
    password
  });

const refreshToken = async () =>
  await request.get<{ message: string }>('/auth/refresh');

const getUser = async () => await request.get<User>('/user');

const logout = async () => await request.get<string>('/auth/logout');

const createUser = async (newUser: UserCreate) =>
  await request.post<User>('/auth/register', newUser);

export const UserService = {
  login,
  refreshToken,
  getUser,
  logout,
  createUser
};
