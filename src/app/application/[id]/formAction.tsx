'use server';
import React from 'react';
import { redirect } from 'next/navigation';
import fetchAPI from '../../api';
import { cookies } from 'next/headers';

async function PostAction(formData: FormData) {
  const id = formData.get('id');
  try {
    const accessToken = cookies().get('accessToken')?.value;
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
    // return {
    //   message: `${error}` || 'An error occurred during adding application.',
    // };
  }
  redirect(`/application/${id}`); //try-catch 문에서 사용은 자제하기, try 안에서 redirect 하면 redirect가 내부적으로 error로 인식해버림!
}

export default PostAction;
