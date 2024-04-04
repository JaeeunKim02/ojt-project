'use server';
import { redirect } from 'next/navigation';
import fetchAPI from './api';

type FormState = {
  message: string;
};
async function onFormPostAction(prevState: FormState, formData: FormData) {
  const password = (formData.get('password') ?? '') as string;

  if (password.length < 8) {
    return { message: 'User password must be longer than 8 letters!' };
  }
  try {
    const res = await fetchAPI.post('/user/register', {
      id: formData.get('id'),
      password: formData.get('password'),
      name: formData.get('name'),
    });
    if (!res.ok) {
      if (res.status === 409) throw new Error('User id already exists!');
      throw new Error('Invalid request');
    }
  } catch (error) {
    console.error('Signup Error:', error);
    return { message: `${error}` || 'An error occurred during signup.' };
  }
  redirect('/');
}

export default onFormPostAction;
