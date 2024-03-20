'use server';
import { redirect } from 'next/navigation';
export default async function GotoApp(formData: FormData) {
  const id = formData.get('id');

  redirect(`/application/${id}`);
}
