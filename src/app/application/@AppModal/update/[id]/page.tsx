'use client';
import { useRouter } from 'next/navigation';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import { useFormState } from 'react-dom';
import PostAction from './formAction';
//[ ] go to app(페이지로 라우팅) 한 뒤에 update 할 수 있게, 기존의 내용이 보이는 상태이어야 함.
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

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [state, action] = useFormState(PostAction, { message: '' });
  console.log(params.id);
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
          Update your application
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{
            marginTop: '5px',
            color: 'rgb(150,150,150)',
            fontSize: '15.5px',
          }}
        >
          * name, description is required *
        </Typography>
        <form
          action={action}
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '20px',
          }}
        >
          {/* <input type="hidden" name="id" id="id" value={params.id}></input> */}
          <TextField id="name" label="name" variant="outlined" name="name" />
          <TextField
            id="description"
            label="description"
            variant="outlined"
            name="description"
          />
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: '#1976d2',
              color: '#fff',
              marginTop: '10px',
            }}
          >
            Update Application
          </Button>
          <p style={{ color: 'red' }}>{state.message}</p>
        </form>
      </Box>
    </Modal>
  );
}
