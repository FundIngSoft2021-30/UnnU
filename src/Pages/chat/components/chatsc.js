import React, { useState, useEffect, useRef } from 'react'
import { db, auth } from '../../../DB/firebase'
import SendMessage from './SendMessage'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
import { useParams } from "react-router-dom";


function Chatsc() {
    const { uidurl } = useParams();
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [uid, setUid] = useState("");
    const [photoPerfil, setphotoPerfil] = useState("");
    const history = useHistory();
    const [dueno, setDueno] = useState("");
    const scroll = useRef()
    const [mensajes, setMessages] = useState([])
    const [uidMensajes, setUidMensajes] = useState("")

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
            alert("Se ha producido un error al obtener los datos del usuario h");
        }
    };

    useEffect(() => {
        fetchUserdata();
        db.collection('mensajes').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))

        })

    }, [])

    return (
        <div className="container_chat">
            <div className="msgs">
                {mensajes.filter(mensajeuid => ((mensajeuid.uid === uidurl) && (mensajeuid.para === auth.currentUser.uid)) || ((mensajeuid.uid === auth.currentUser.uid) && (mensajeuid.para === uidurl))).map(({ id, text, photoPerfil, uid, para, name }) => (
                    <div >
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`} >

                            <img class="perfil" src={photoPerfil} alt="  " />
                            <div>
                                <h5>{name}</h5>
                                <h3>{text}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    )
}

export default Chatsc