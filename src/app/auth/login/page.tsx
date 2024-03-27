'use client';
import React from 'react';
import { Button, TextField } from '@mui/material';
import { useFormState } from 'react-dom';
import onFormPostAction from './formAction';

function LoginPage() {
  const [state, action] = useFormState(onFormPostAction, { message: '' });
  return (
    <div
      className="
    flex 
    justify-start 
    items-center 
    flex-col 
    pt-[25vh] 
    pb-[25vh] 
    gap-[10px] 
  "
    >
      <h2>Log in</h2>
      <form action={action} className="flex items-center flex-col gap-[10px]">
        <TextField id="id" label="id" variant="outlined" name="id" />
        <TextField
          type="password"
          id="password"
          label="password"
          variant="filled"
          name="password"
        />
        <Button
          type="submit"
          variant="contained"
          className="bg-[#1976d2] text-[#fff]"
        >
          LOG IN
        </Button>
        <p className="text-red-500">{state.message}</p>
      </form>
    </div>
  );
}

export default LoginPage;
