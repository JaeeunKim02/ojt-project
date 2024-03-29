'use server';
import { redirect } from 'next/navigation';
import fetchAPI from './api';
import { cookies } from 'next/headers';

type FormState = {
  message: string;
};

export async function updateApplication(formData: FormData) {
  const id = formData.get('id');
  const accessToken = cookies().get('accessToken')?.value;
  try {
    const res = await fetchAPI(
      `/application/${id}`,
      'PUT',
      {
        name: formData.get('name'),
        description: formData.get('description'),
      },
      `Bearer ${accessToken}`,
    );
    if (!res.ok) {
      console.log(res);
      if (res.status === 401) throw new Error('Unauthorized');
      throw new Error('Invalid request');
    }
  } catch (error) {
    console.error('Update Application Error:', error);
    redirect('/application?page=1&size=10');
    // return {
    //   message: `${error}` || 'An error occurred during adding application.',
    // };
  }
  console.log('formAction success');
  redirect('/application?page=1&size=10'); //try-catch 문에서 사용은 자제하기, try 안에서 redirect 하면 redirect가 내부적으로 error로 인식해버림!
}

export async function createApplication(
  prevState: FormState,
  formData: FormData,
) {
  try {
    const accessToken = cookies().get('accessToken')?.value;
    const res = await fetchAPI(
      '/application',
      'POST',
      {
        name: formData.get('name'),
        description: formData.get('description'),
      },
      `Bearer ${accessToken}`,
    );
    if (!res.ok) {
      if (res.status === 401) throw new Error('Unauthorized');
      throw new Error('Invalid request');
    }
  } catch (error) {
    console.error('Create Application Error:', error);
    return {
      message: `${error}` || 'An error occurred during adding application.',
    };
  }
  redirect('/application?page=1&size=10'); //try-catch 문에서 사용은 자제하기, try 안에서 redirect 하면 redirect가 내부적으로 error로 인식해버림!
}

export async function updateModal(prevState: FormState, formData: FormData) {
  const accessToken = cookies().get('accessToken')?.value;
  const id = formData.get('id');
  try {
    const res = await fetchAPI(
      `/application/${id}`,
      'PUT',
      {
        name: formData.get('name'),
        description: formData.get('description'),
      },
      `Bearer ${accessToken}`,
    );
    if (!res.ok) {
      if (res.status === 401) throw new Error('Unauthorized');
      throw new Error('Invalid request');
    }
  } catch (error) {
    console.error('Update Application Error:', error);
    return {
      message: `${error}` || 'An error occurred during adding application.',
    };
  }
  redirect('/application?page=1&size=10'); //try-catch 문에서 사용은 자제하기, try 안에서 redirect 하면 redirect가 내부적으로 error로 인식해버림!
}

export async function getApplication(id: string) {
  const accessToken = cookies().get('accessToken')?.value;
  const res = await fetch(`${process.env.API_URL}/application/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await res.json();
}
