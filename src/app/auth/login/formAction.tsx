'use server';
import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import fetchAPI from '../../api';

interface UserDto {
  id: string;
  name: string;
}

interface LoginResponseDto {
  accessToken: string;
  user: UserDto;
}
type FormState = {
  message: string;
};
async function onFormPostAction(prevState: FormState, formData: FormData) {
  try {
    const res = await fetchAPI('/auth/login', 'POST', {
      id: formData.get('id'),
      password: formData.get('password'),
    });
    if (!res.ok) {
      throw new Error('Login failed');
    } else {
      const dto: LoginResponseDto = await res.json(); // 안될 때 awiat Promise.resolve(res.json());
      cookies().set('accessToken', dto.accessToken);
      cookies().set('userId', dto.user.id);
    }
  } catch (error) {
    console.error('Login error:', error);
    return { message: `${error}` || 'An error occurred during login.' };
  }
  redirect('/'); //try-catch 문에서 사용은 자제하기, try 안에서 redirect 하면 redirect가 내부적으로 error로 인식해버림!
}

export default onFormPostAction;
