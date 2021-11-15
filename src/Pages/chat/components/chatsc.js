
import React,{ useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { useAuth } from '../components/AuthContext';
import { auth } from '../../../DB/firebase'
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';


function Chatsc  ()  {
    const history = useHistory();
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(true);

    console.log(user);


    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data],  "UserPhoto.jpg", { type: 'image/jpeg'});
    }

    useEffect(() => {
        if(!user) {
            history.push('/')

            return;
        }

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

    if(!user || loading) return 'loading...';

    return (
        <div className='chats-page'>
            <ChatEngine 
            height="calc(100vh - 66px)"
            projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
            userName={user.email}
            userSecret={user.uid}
            />
        </div>
    );
}

export default Chatsc;


