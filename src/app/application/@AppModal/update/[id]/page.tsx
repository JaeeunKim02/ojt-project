'use client';
import { useRouter } from 'next/navigation';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import { useFormState } from 'react-dom';
import { updateModal } from '../../../../../api/applicationApi';
import { Cookies } from 'react-cookie';

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

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const router = useRouter();
    const [state, action] = useFormState(updateModal, { message: '' });
    const cookies = new Cookies();
    const accessToken = cookies.get('accessToken');
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
            {/* [ ] */}
            <Typography
              id="modal-modal-description"
              className="mt-[5px] text-[rgb(150,150,150)] text-[15.5px]"
            >
              * name, description is required *
            </Typography>
            <form
              action={action}
              className="flex items-center flex-col gap-[10px] mt-[20px]"
            >
              <input type="hidden" name="id" id="id" value={params.id}></input>
              <TextField
                required
                id="name"
                label="name"
                variant="outlined"
                name="name"
                defaultValue={dto.name}
              />
              <TextField
                // required
                id="description"
                label="description"
                variant="outlined"
                name="description"
                defaultValue={dto.description}
              />
              {/* [ ] */}
              <Button
                type="submit"
                variant="contained"
                className="bg-[#1976d2] text-[#fff] mt-[10px]"
              >
                Update Application
              </Button>
              <p className="text-red-500">{state.message}</p>
            </form>
          </Box>
        </Modal>
      );
    }
  } catch (error) {}
  console.error('Authentication error');
  return <>Sorry... Application not found.</>;
}
