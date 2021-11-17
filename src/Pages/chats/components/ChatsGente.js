import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useHistory } from "react-router";
import {
    auth,
    db,
    matchXusuario,
    matchPropioUsuario,
    matchuid
} from "../../../DB/firebase";
import useFitText from "use-fit-text";
import { Chat } from 'stream-chat-react';


function ChatsGente() {

    const [users, setUsers] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [uid, setUid] = useState("");
    const [photoPerfil, setphotoPerfil] = useState("");
    const history = useHistory();
    const [match, setMatch] = useState([]);


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
            setMatch(data.matchuid);

        } catch (err) {
            console.error(err);
            alert("Se ha producido un error al obtener los datos del usuario");
        }
    };

    useEffect(() => {

        if (loading) return;
        if (!user) return history.replace("/");
        fetchUserdata();
        const unsubscribe = db.collection('usuarios').onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => doc.data()))
        })

    }, [user, loading])



    return (
        <div>
            <div className="container_chats">

                {users.filter(user => (user.uid !== uid)).map(userr => (
                  
                        <div className="margen" >
                            <div className='grande'>
                                <img class="profileNB" src={userr.photoPerfil} alt="  " /><h2 className="textogande" >{userr.name} {userr.edad}</h2>
                            </div>
                        </div>
                 
                ))}
            </div>
        </div>
    )



} export default ChatsGente