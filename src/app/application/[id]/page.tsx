'use server';
import { cookies } from 'next/headers';
export default async function GotoApp({ params }: { params: { id: string } }) {
  const accessToken = cookies().get('accessToken')?.value;
  try {
    const res = await fetch(`${process.env.API_URL}/application/${params.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      if (res.status === 404) throw new Error('Application not found');
      throw new Error('Authentication error');
    } else {
      const dto = await res.json();
      console.log(dto.id, dto.name, dto.description);
      return (
        <div>
          <h1>{dto.id}</h1>
          <h1>{dto.name}</h1>
          <h1>{dto.description}</h1>
        </div>
      );
    }
  } catch (error) {
    console.error('Authentication error');
    return { message: `${error}` || 'An error occurred.' };
  }
}
