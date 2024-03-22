'use client';
import { useRouter } from 'next/navigation';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import { useFormState } from 'react-dom';
import onFormPostAction from './formAction';

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

export default function Page() {
  const router = useRouter();
  const [state, action] = useFormState(onFormPostAction, { message: '' });
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
          Add your application
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
          <TextField
            required
            id="name"
            label="name"
            variant="outlined"
            name="name"
          />
          <TextField
            required
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
            Add Application
          </Button>
          <p style={{ color: 'red' }}>{state.message}</p>
        </form>
      </Box>
    </Modal>
  );
}
