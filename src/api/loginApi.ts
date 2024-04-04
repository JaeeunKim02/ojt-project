'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import fetchAPI from './api';

interface UserDto {
  id: string;
  name: string;
  permission: string;
}

interface LoginResponseDto {
  user: UserDto;
  accessToken: string;
}
type FormState = {
  message: string;
};
async function onFormPostAction(prevState: FormState, formData: FormData) {
  try {
    const res = await fetchAPI.post('/auth/login', {
      id: formData.get('id'),
      password: formData.get('password'),
    });
    if (!res.ok) {
      throw new Error('Login failed');
    } else {
      console.log(res);
      const dto: LoginResponseDto = await res.json(); // 안될 때 awiat Promise.resolve(res.json());
      cookies().set('accessToken', dto.accessToken);
      cookies().set('userId', dto.user.id);
      cookies().set('permission', dto.user.permission);
    }
  } catch (error) {
    console.error('Login error:', error);
    return { message: `${error}` || 'An error occurred during login.' };
  }
  redirect('/');
}

export default onFormPostAction;
