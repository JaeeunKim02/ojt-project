'use server';
import React from 'react';
import { cookies } from 'next/headers';
import { Button, TextField } from '@mui/material';
import formAction from './formAction';

const textFieldStyle = {
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
        <div className="flex rounded-lg bg-slate-100 flex-col m-[70px] p-[50px] gap-[90px]">
          <h2 className="text-[25px] font-bold">{dto.name}</h2>
          <form action={formAction} className="flex flex-col gap-[10px]">
            <p>ID</p>
            <TextField
              style={textFieldStyle}
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
              style={textFieldStyle}
              required
              id="name"
              name="name"
              label="name"
              defaultValue={dto.name}
            />
            <p>DESCRIPTION</p>
            <TextField
              style={textFieldStyle}
              required
              id="description"
              name="description"
              label="description"
              defaultValue={dto.description}
            />
            <div className="flex flex-row gap-[15px] m-[20px]">
              <Button href="/application?page=1&size=10" variant="outlined">
                Cancel
              </Button>
              {/* [ ] */}
              <Button
                type="submit"
                variant="contained"
                className="bg-[#1976d2] text-[#fff]"
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
