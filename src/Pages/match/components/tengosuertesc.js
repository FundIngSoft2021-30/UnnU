import React, { useState, useMemo, useRef, useEffect } from 'react'
import './tengosuertesc.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import TinderCard from 'react-tinder-card'
import {
    auth,
    db,
    likesXusuario,
    likesrecibidosxusuario,
    matchXusuario,
    matchPropioUsuario
} from "../../../DB/firebase";
import useFitText from "use-fit-text";


function Tengosuerte() {
    const { fontSize, ref } = useFitText();
    const [users, setUsers] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [direc, setDirec] = useState("");
    const [uid, setUid] = useState("");
    const [gustosUser, setGustosUser] = useState("");
    const [photoPerfil, setphotoPerfil] = useState("");
    const [match, setMatch] = useState("");
    const [match2, setMatch2] = useState("");
    const [likesdados, setLikesdados] = useState([]);
    const history = useHistory();
    const [likesrecibidos, setLikesrecibidos] = useState("");
    const [currentIndex, setCurrentIndex] = useState(db.length - 1)
    const [lastDirection, setLastDirection] = useState()
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
            setLikesdados(data.likesdados);
            setphotoPerfil(data.photoPerfil);
            setLikesrecibidos(data.likesrecibidos);
            setUid(data.uid);
            setMatch(data.matchuid);
            setMatch2(data.matchuid);
            setGustosUser(data.gustos);
        } catch (err) {
            console.error(err);
            alert("Se ha producido un error al obtener los datos del usuario");
        }
    };


    const childRefs = useMemo(
        () =>
            Array(db.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < db.length - 1

    const canSwipe = currentIndex >= 0

    // set last direction and decrease current index
    const swiped = (direction, index, usuarioActual) => {
        setLastDirection(direction)
        fetchUserdata();
        if (direction === 'left') {
            if (!likesdados.includes(usuarioActual)) {
                setLikesdados(index)
                likesdados.push(index);
            }
            if (!likesrecibidos.includes(usuarioActual)) {
                likesXusuario(likesdados);
                likesrecibidos.push(usuarioActual);
            }
            likesrecibidosxusuario(index, likesrecibidos);
            mirarLikedual(index, usuarioActual)
        }


    }
    const mirarLikedual = (index, usuarioActual) => {
        if (likesdados.includes(index) && likesrecibidos.includes(index)) {
            matchUsuarixlike(index, usuarioActual);
            matchUsuarioactual(index);
        }
    }
    const matchUsuarixlike = (index, usuarioActual) => {
        setMatch(usuarioActual)
        match.push(usuarioActual);
        matchXusuario(index, match);
    }
    const matchUsuarioactual = (index, usuarioActual) => {
        setMatch2(index)
        match2.push(index);
        matchPropioUsuario(match2)

    }
    const swipe = async (dir) => {
        console.log(canSwipe)
        if (!canSwipe) {
            await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
            console.log("hola")
        }
    }

    // increase current index and show card
    const goBack = async () => {
        if (!canGoBack) return
        const newIndex = currentIndex + 1
        updateCurrentIndex(newIndex)
        await childRefs[newIndex].current.restoreCard()
    }


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
            <link
                href='https://fonts.googleapis.com/css?family=Damion&display=swap'
                rel='stylesheet'
            />
            <link
                href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
                rel='stylesheet'
            />

            <div className="tinderCard__cardContainer">

                {users.filter(user => (user.uid !== uid) && (!likesdados.includes(user.uid) && (user.gustos.length === gustosUser.length && user.gustos.every((e, i) => e.label === gustosUser[i].label && e.value === gustosUser[i].value)))).map(userr => (


                    <TinderCard
                        className="swipe"
                        key={userr.name}
                        preventSwipe={['up', 'down']}
                        onSwipe={(dir) => swiped(dir, userr.uid, uid)}
                    >

                        <div style={{ backgroundImage: `url(${userr.photoPerfil})` }} className="card">

                            <div className='container'>
                                <div className='grande'>
                                    <h2 style="textogande" >{userr.name} {userr.edad}</h2>
                                </div>
                                <h3 classname='textomediano' >{userr.carrera.value}</h3>
                                <h3 >{userr.genero.value}</h3>
                                <div className='containerMA'>
                                    {userr.gustos.map(gusto => <button className='redondoMatch'>{gusto.label}</button>)}
                                </div>
                            </div>
                        </div>
                    </TinderCard>
                ))}
            </div>
            <div className='buttons'>
                <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
                <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
                <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
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
}
export default Tengosuerte;