import { request } from '@/lib/request';

const login = async (email: string, password: string) => {
  const response = await request.post<{ message: string }>('/auth/login', {
    email,
    password
  });

  return response;
};

export const UserService = {
  login
};
