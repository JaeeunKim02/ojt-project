'use server';
import { cookies } from 'next/headers';
import { Button, TextField } from '@mui/material';
import formAction from './formAction';

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
          <h2>{dto.name}</h2>
          <form
            action={formAction}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <TextField disabled id="id" label="id" defaultValue={dto.id} />
            <TextField
              required
              id="name"
              label="name"
              defaultValue={dto.name}
            />
            <TextField
              required
              id="description"
              label="description"
              defaultValue={dto.description}
            />
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#1976d2', color: '#fff' }}
            >
              Update Application
            </Button>
          </form>
        </div>
      );
    }
  } catch (error) {
    console.error('Authentication error');
    // return { message: `${error}` || 'An error occurred.' };
  }
}
