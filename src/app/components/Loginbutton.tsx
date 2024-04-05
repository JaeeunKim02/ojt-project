import { logoutHandle } from '../action';

// 원래 기존에는 서버 action에 api 같은 거 넣어서 백엔드에서 해결하도록 했는데,
// 지금 바뀐 nextjs는 action에 'use server' 인 함수 넣어서 프론트에서 해결할 수 있도록 함.
const Loginbutton: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  return (
    <>
      {isLoggedIn ? (
        <form
          action={logoutHandle}
          style={{ marginLeft: 'auto', textAlign: 'center' }}
        >
          <button type="submit">LOG OUT</button>
        </form>
      ) : (
        <a href="/login">LOG IN</a>
      )}
    </>
  );
};

export default Loginbutton;
