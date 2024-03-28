'use server';
import React from 'react';
import { redirect } from 'next/navigation';
import fetchAPI from '../../../../../api/api';
import { cookies } from 'next/headers';

type FormState = {
  message: string;
};

async function PostAction(prevState: FormState, formData: FormData) {
  try {
    const accessToken = cookies().get('accessToken')?.value;
    const id = formData.get('id');
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

export default PostAction;
