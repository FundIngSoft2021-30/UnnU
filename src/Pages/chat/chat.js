import React from 'react';
import ReactDOM from 'react-dom';
import ChatSC from './components/chatsc';
import NavbarU from '../NavBarUser/NavBarUC';

function Chat() {
    return (
        <>
            <NavbarU />
            <ChatSC />
        </>
    );
}

export default Chat;