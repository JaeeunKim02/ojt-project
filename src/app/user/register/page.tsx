'use client';
import React from 'react';
import { Button, TextField } from '@mui/material';
import { useFormState } from 'react-dom';
import signupApi from '../../../api/signupApi';

function SignupPage() {
  const [state, action] = useFormState(signupApi, { message: '' });
  return (
    <div
      className="
    flex 
    justify-start 
    items-center 
    flex-col 
    pt-[25vh] 
    pb-[25vh] 
    gap-[20px] 
  "
    >
      <h2>Sign up</h2>
      <form action={action} className="flex items-center flex-col gap-[10px]">
        <TextField id="name" label="name" variant="outlined" name="name" />
        <TextField id="id" label="id" variant="outlined" name="id" />
        <TextField
          type="password"
          id="password"
          label="password"
          variant="filled"
          name="password"
        />
        {/* [ ] */}
        <Button
          type="submit"
          variant="contained"
          style={{
            backgroundColor: '#1976d2',
            color: '#fff',
            marginTop: '10px',
          }}
        >
          SIGN UP
        </Button>
        <p className="text-red-500">{state.message}</p>
      </form>
    </div>
  );
}

export default SignupPage;
