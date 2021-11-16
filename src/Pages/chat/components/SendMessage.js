import React, { useState } from 'react'
import { db, auth } from '../../../DB/firebase'
import firebase from 'firebase'
import { Input, Button } from '@material-ui/core'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';

function SendMessage({ scroll }) {
    const [msg, setMsg] = useState('')


    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [uid, setUid] = useState("");
    const [photoPerfil, setphotoPerfil] = useState("");
    const history = useHistory();

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


    async function sendMessage(e) {
        fetchUserdata();
        e.preventDefault();

        await db.collection('mensajes').add({
            text: msg,
            photoPerfil,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div>

            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <Input style={{ width: '100%', fontSize: '15px', fontWeight: '550', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <Button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px' }} type="submit">Send</Button>
                </div>
            </form>

        </div>
    )
}

export default SendMessage