'use server';
import { redirect } from 'next/navigation';
import fetchAPI from './api';
import { cookies } from 'next/headers';

type FormState = {
  message: string;
};

//defining function parameters type
export async function userInfo(userId: string) {
  const accessToken = cookies().get('accessToken')?.value;
  try {
    const res = await fetchAPI.get(`/user/info/${userId}`, `${accessToken}`);
    if (!res.ok) {
      console.log(res);
      if (res.status === 401) throw new Error('Unauthorized');
      if (res.status === 403) throw new Error('Permission denied');
      if (res.status === 404) throw new Error('User not found');
      throw new Error('Invalid request');
    }
    return await res.json();
  } catch (error) {
    console.error('User Information Error:', error);
    redirect('/');
  }
}

export async function userPermission(prevState: FormState, formData: FormData) {
  const accessToken = cookies().get('accessToken')?.value;
  try {
    const res = await fetchAPI.post(
      `/user/permission`,
      { id: formData.get('userId'), permission: formData.get('permission') },
      `${accessToken}`,
    );
    if (!res.ok) {
      if (res.status === 401) throw new Error('Unauthorized');
      if (res.status === 403) throw new Error('Permission denied');
      if (res.status === 404) throw new Error('User not found');
      throw new Error('Invalid request');
    }
  } catch (error) {
    console.error('Setting user permission Error:', error);
    return {
      message:
        `${error}` || 'An error occurred during setting user permission.',
    };
  }
  redirect('/userList');
}
