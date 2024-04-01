'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const logoutHandle = async () => {
  cookies().delete('accessToken');
  cookies().delete('userId');
  cookies().delete('permission');
  redirect('/');
};
