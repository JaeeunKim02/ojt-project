'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const logoutHandle = async () => {
  cookies().delete('accessToken');
  cookies().delete('userId');
  cookies().delete('isLoggedIn');
  redirect('/');
  // await fetch('http://localhost:3000/api/logouthandler', {method:'POST'})
};
