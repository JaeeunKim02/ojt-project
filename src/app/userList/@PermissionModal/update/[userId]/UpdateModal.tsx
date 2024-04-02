'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import { useFormState } from 'react-dom';
import { userPermission } from '../../../../../api/userApi';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
//[x] go to app(페이지로 라우팅) 한 뒤에 update 할 수 있게, 기존의 내용이 보이는 상태이어야 함.
//[x] 뒤로가기, 홈 버튼 항상 보일 수 있게
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
};

export default function UpdateModal({
  userId,
  defaultPermission,
}: {
  userId: string;
  defaultPermission: string;
}) {
  const router = useRouter();
  const [state, action] = useFormState(userPermission, { message: '' });
  console.log(userId);
  return (
    <Modal
      open={true}
      onClose={() => {
        router.back();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Set User Permission
        </Typography>
        {/* [ ] */}
        <Typography
          id="modal-modal-description"
          className="mt-[5px] text-[rgb(150,150,150)] text-[15.5px]"
        >
          * User Id, Permission is required *
        </Typography>
        <form
          action={action}
          className="flex items-center flex-col gap-[15px] mt-[20px]"
        >
          <TextField
            InputProps={{
              readOnly: true,
            }}
            id="userId"
            label="User ID"
            variant="outlined"
            name="userId"
            defaultValue={userId}
            sx={{ width: '195px' }}
          />
          <FormControl>
            <InputLabel id="permission-label">permission</InputLabel>
            <Select
              id="permission"
              name="permission"
              label="permission"
              defaultValue={defaultPermission}
              sx={{ width: '195px' }}
            >
              <MenuItem value={'guest'}>guest</MenuItem>
              <MenuItem value={'manager'}>manager</MenuItem>
              <MenuItem value={'admin'}>admin</MenuItem>
            </Select>
          </FormControl>
          {/* [ ] */}
          <Button
            type="submit"
            variant="contained"
            className="bg-[#1976d2] text-[#fff] mt-[5px]"
          >
            Set Permission
          </Button>
          <p className="text-red-500">{state.message}</p>
        </form>
      </Box>
    </Modal>
  );
}
