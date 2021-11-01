import React, { useState, useEffect } from 'react'
import './tengosuertesc.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import TinderCard from 'react-tinder-card'
import { auth, db } from "../../../DB/firebase";
import useFitText from "use-fit-text";


function Tengosuerte() {
    const { fontSize, ref } = useFitText();
    const [users, setUsers] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [direc, setDirec] = useState("");
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
    const onSwipe = (direction) => {
        console.log(direction)
        if (direction === 'left') {
            setDirec("left")
        }
    }


    const onCardLeftScreen = (name, direc, user) => {
        console.log(name + '  l' + direc + '  ' + user)
    }

    return (
        <div>


            <div className="tinderCard__cardContainer">

                {users.filter(user => user.uid !== uid).map(userr => (


                    <TinderCard
                        className="swipe"
                        key={userr.name}
                        preventSwipe={['up', 'down']}

                        onSwipe={onSwipe}


                        onCardLeftScreen={() => onCardLeftScreen(name, direc, userr.uid)}>

                        <div
                            style={{ backgroundImage: `url(${userr.photoPerfil})` }}
                            className="card">

                            <div className='container'>
                                <div className='grande'>
                                    <h2 >{userr.name} {userr.edad}</h2>
                                </div>
                                <h3 >{userr.carrera.value}</h3>
                                <h3 >{userr.genero.value}</h3>
                                <div className='containerMA'>
                                    {userr.gustos.map(gusto => <div className='redondoMatch'>{gusto.label}</div>)}
                                </div>
                            </div>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    )
}

export default Tengosuerte;