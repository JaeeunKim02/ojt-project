'use server';
import React from 'react';
import { cookies } from 'next/headers';
import { Button, TextField } from '@mui/material';
import formAction from './formAction';

const styles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  margin: '70px',
  padding: '50px',
  backgroundColor: 'rgb(240,240,240)',
  gap: '90px',
};
const textFieldSx: React.CSSProperties = {
  marginTop: '10px',
  marginBottom: '30px',
  width: '30%',
};

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
        <div style={styles}>
          <h2 style={{ fontSize: '25px', fontWeight: 'bold' }}>{dto.name}</h2>
          <form
            action={formAction}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <p>ID</p>
            <TextField
              style={textFieldSx}
              InputProps={{
                readOnly: true,
              }}
              id="id"
              name="id"
              label="id"
              defaultValue={dto.id}
            />
            <p>NAME</p>
            <TextField
              style={textFieldSx}
              required
              id="name"
              name="name"
              label="name"
              defaultValue={dto.name}
            />
            <p>DESCRIPTION</p>
            <TextField
              style={textFieldSx}
              required
              id="description"
              name="description"
              label="description"
              defaultValue={dto.description}
            />
            <div
              style={{
                margin: '20px',
                display: 'flex',
                flexDirection: 'row',
                gap: '15px',
              }}
            >
              <Button href="/application2?page=1&size=12" variant="outlined">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: '#1976d2',
                  color: '#fff',
                }}
              >
                Update Application
              </Button>
            </div>
          </form>
        </div>
      );
    }
  } catch (error) {
    console.error('Authentication error');
    return <>Sorry... Application not found.</>;
    // return { message: `${error}` || 'An error occurred.' };
  }
}
