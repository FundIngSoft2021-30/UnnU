import './components/ChatsGente.css';
import ChatsGente from './components/ChatsGente';
import React from 'react';
import { auth } from '../../DB/firebase'
import NavbarU from '../NavBarUser/NavBarUC';
import { useAuthState } from 'react-firebase-hooks/auth'

function Chats() {
  const [user] = useAuthState(auth)
  return (
    <>
      <NavbarU />
      <ChatsGente />
    </>
  );
}

export default Chats;