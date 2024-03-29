'use server';
import UpdateModal from './UpdateModal';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import { useFormState } from 'react-dom';
import { updateModal, getApplication } from '../../../../../api/applicationApi';
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
  const res = await getApplication(params.id);
  console.log(res.id, res.name, res.description);
  return (
    <UpdateModal
      id={params.id}
      defaultName={res.name}
      defaultDescription={res.description}
    />
  );
}
