<<<<<<< HEAD

import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { useAuth } from '../components/AuthContext';
import { auth } from '../../../DB/firebase'
import axios from 'axios';
=======
import React, { useState, useEffect, useRef } from 'react'
import { db, auth } from '../../../DB/firebase'
import SendMessage from './SendMessage'
>>>>>>> d98925cc13600b68ac111ccb5c1b03b2b36a5c0c
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';


<<<<<<< HEAD
function Chatsc() {
    const history = useHistory();
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(true);

    console.log(user);

=======
>>>>>>> d98925cc13600b68ac111ccb5c1b03b2b36a5c0c

function Chat() {

<<<<<<< HEAD
        return new File([data], "UserPhoto.jpg", { type: 'image/jpeg' });
    }

    useEffect(() => {
        if (!user) {
            history.push('/')
=======
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [uid, setUid] = useState("");
    const [photoPerfil, setphotoPerfil] = useState("");
    const history = useHistory();
>>>>>>> d98925cc13600b68ac111ccb5c1b03b2b36a5c0c

    const fetchUserdata = async () => {
        try {
            const query = await db
                .collection("usuarios")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setName(data.name);
            setphotoPerfil(data.photoPerfil);
            setUid(data.uid);
        } catch (err) {
            console.error(err);
            alert("Se ha producido un error al obtener los datos del usuario");
        }
    };

<<<<<<< HEAD
        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user.name,
                "user-secret": user.uid,
            }
        })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                let formdata = new FormData();
                formdata.append('name', user.name);
                formdata.append('username', user.displayName);
                formdata.append('secret', user.uid);

                getFile(user.photoURL)
                    .then((avatar) => {
                        formdata.append('avatar', avatar, avatar.name);

                        axios.post('https://api.chatengine.io/users/',
                            formdata,
                            { headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY } }
                        )
                            .then(() => setLoading(false))
                            .catch((error) => console.log(error))
                    })
            })
    }, [user, history]);

    if (!user || loading) return 'loading...';

    return (
        <div className='chats-page'>
            <ChatEngine
                height="calc(100vh - 66px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.email}
                userSecret={user.uid}
            />
=======
    const scroll = useRef()
    const [mensajes, setMessages] = useState([])

    useEffect(() => {
        fetchUserdata();
        db.collection('mensajes').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])


    return (
        <div className="container_chat">
            <div className="msgs">
                {mensajes.map(({ id, text, photoPerfil, uid }) => (
                    <div >
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            <img src={photoPerfil} alt="  " />
                            <div>
                                <h6>{name}</h6>
                                <h3>{text}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
>>>>>>> d98925cc13600b68ac111ccb5c1b03b2b36a5c0c
        </div>
    )
}

export default Chat
