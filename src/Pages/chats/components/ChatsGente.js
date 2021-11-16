
import { db, auth } from '../../../DB/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import {
    auth,
    db,
    likesXusuario,
    likesrecibidosxusuario,
    matchXusuario,
    matchPropioUsuario
} from "../../../DB/firebase";
import useFitText from "use-fit-text";
import { Chat } from 'stream-chat-react';


function ChatsGente() {

    const { fontSize, ref } = useFitText();
    const [users, setUsers] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [uid, setUid] = useState("");
    const [photoPerfil, setphotoPerfil] = useState("");
    const history = useHistory();
    const [currentIndex, setCurrentIndex] = useState(db.length - 1)
    const [lastDirection, setLastDirection] = useState()
    const [matches, setMatch] = useState([]);
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)

    const fetchUserdata = async () => {
        try {
            const query = await db
                .collection("usuarios")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setName(data.name);
            setphotoPerfil(data.photoPerfil);
            setLikesrecibidos(data.likesrecibidos);
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


        return () => {
            unsubscribe();
        }
    }, [user, loading])



    return (
        <div>

            <div className="tinderCard__cardContainer">

                {users.filter(user => (user.uid !== uid) && (matches.includes(user.uid))).map(userr => (

                    <div className='buttons_chat'>
                        <div className='container_matches'>
                            <div >
                                <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                                    <imagen src={userr.photoPerfil.value} alt="  " />
                                    <div>
                                        <h3>{userr.name.value}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
            <div className='buttons_chat'>
                <button style={{ backgroundColor: red }} onClick={() => Chat}></button>
            </div>
            {lastDirection ? (
                <h2 key={lastDirection} className='infoText'>
                    You swiped {lastDirection}
                </h2>
            ) : (
                <h2 className='infoText'>
                    Swipe a card or press a button to get Restore Card button visible!
                </h2>
            )}
        </div>
    )



} export default ChatsGente