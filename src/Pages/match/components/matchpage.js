import React, { useState, useMemo, useRef, useEffect } from 'react'
import './matchpage.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import TinderCard from 'react-tinder-card'
import {
    auth,
    db,
    likesXusuario,
    likesrecibidosxusuario,
    matchXusuario,
    matchPropioUsuario,
    crearConver,
    uiddescartadosxusuario
} from "../../../DB/firebase";
import useFitText from "use-fit-text";
import Swal from 'sweetalert2'

function MatchPage() {
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
    const [uiddescartados, setUiddescartados] = useState([]);
    const history = useHistory();
    const [likesrecibidos, setLikesrecibidos] = useState("");
    const [currentIndex, setCurrentIndex] = useState(db.length - 1)
    const [lastDirection, setLastDirection] = useState()
    const [uid1,setUid1]=useState("");//uid usuario actual
    const [uid2,setUid2]=useState("")//uid usuario con quien hizo match
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
            setUiddescartados(data.uiddescartados);
            setUid(data.uid);
            setMatch(data.matchuid);
            setMatch2(data.matchuid);
            setGustosUser(data.gustos);
            setUid1(data.uid);
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
    const swiped = (direction, index, usuarioActual, nombrepersona) => {
        setLastDirection(direction)
        fetchUserdata();
        if (direction === 'left') {

            if (!likesdados.includes(index)) {
                setLikesdados(index)
                likesdados.push(index);
            }
            if (!likesrecibidos.includes(index)) {
                likesXusuario(likesdados);
                likesrecibidos.push(usuarioActual);
            }
            likesrecibidosxusuario(index, likesrecibidos);
            mirarLikedual(index, usuarioActual, nombrepersona)
        }
        if (direction === 'right') {
            if (!uiddescartados.includes(index)) {
                setUiddescartados(index)
                uiddescartados.push(index);
                uiddescartadosxusuario(usuarioActual, uiddescartados);
            }
        }
    }


    const mirarLikedual = (index, usuarioActual, nombrepersona) => {
        if (likesdados.includes(index) && likesrecibidos.includes(index)) {
            matchUsuarixlike(index, usuarioActual);
            matchUsuarioactual(index, nombrepersona);
            setUid2(index);
            crearConver(uid1,uid2);
        }
    }
    const matchUsuarixlike = (index, usuarioActual) => {
        setMatch(usuarioActual)
        match.push(usuarioActual);
        matchXusuario(index, match);
    }
    const matchUsuarioactual = (index, nombrepersona) => {
        setMatch2(index)
        match2.push(index);
        matchPropioUsuario(match2)
        Swal.fire({
            title: 'Felicitaciones obtuviste un match con',
            text: nombrepersona,
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
        })

    }
    const swipe = async (dir) => {
        //  console.log(canSwipe(dir))
        if (!canSwipe) {
            //await swipe(dir) // Swipe the card!
            //console.log("hola")
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

                {users.filter(user => (user.uid !== uid) && (!likesdados.includes(user.uid)) && (!uiddescartados.includes(user.uid)) && (!match.includes(user.uid))).map(userr => (


                    <TinderCard
                        className="swipe"
                        key={userr.name}
                        preventSwipe={['up', 'down']}
                        onSwipe={(dir) => swiped(dir, userr.uid, uid, userr.name)}
                    >

                        <div style={{ backgroundImage: `url(${userr.photoPerfil})` }} className="card">

                            <div className='container'>
                                <div className='grande'>
                                    <h2 className="textogande" >{userr.name} {userr.edad}</h2>
                                </div>
                                <h3 className="textomediano">{userr.carrera.value}</h3>
                                <h3 className="textomediano">{userr.genero.value}</h3>
                                <div className='containerMA'>
                                    {userr.gustos.map(gusto => <button className='redondoMatch'>{gusto.label}</button>)}
                                </div>
                            </div>
                        </div>

                    </TinderCard>
                ))}
            </div>

        </div>
    )
}

export default MatchPage