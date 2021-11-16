import './chat.css';
import Chatsc from './components/Chatsc';
import { auth } from '../../DB/firebase'
import NavbarU from '../NavBarUser/NavBarUC';
import { useAuthState } from 'react-firebase-hooks/auth'

function Chat() {
  const [user] = useAuthState(auth)
  return (
    <>
      <NavbarU />
      <Chatsc />
    </>
  );
}

export default Chat;