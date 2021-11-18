import React, { useState, useEffect } from 'react';
import { auth, db } from "../../../DB/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { HiCalendar, HiChatAlt2, HiStar, HiUsers, HiUser } from "react-icons/hi";
import { Link } from 'react-router-dom';
import './NavbarU.css';


function NavbarU() {



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
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };
    useEffect(() => {
        if (loading) return;
        if (!user) return history.replace("/");

        fetchUserdata();
        showButton();
    }, [user, loading]);
    window.addEventListener('resize', showButton);
    return (
        <>
            <nav className='navbaru'>

                <div className="perfilNB">
                    <div>
                        <Link to='/user-home'>
                            <img class="profileNB" src={photoPerfil} /><a className="txtNB">{name}</a>
                        </Link>
                    </div>

                </div>

                <div className='navbar-containeru'>

                    <div className='menu-iconu' onClick={handleClick}>

                    </div>
                    <ul className={click ? 'nav-menu activeUS' : 'nav-menuUS'}>
                        <li className='nav-itemUS'>
                            <Link to='/calendario' className='nav-linksUS' onClick={closeMobileMenu}>
                                <div className='nav-buttonUS'><HiCalendar /></div>
                            </Link>
                        </li>
                        <li className='nav-itemUS'>
                            <Link to='/tengosuerte' className='nav-linksUS' onClick={closeMobileMenu}>
                                <div className='nav-buttonUS'><HiStar /></div>
                            </Link>
                        </li>
                        <li className='nav-itemUS'>
                            <Link to='/match' className='nav-linksUS' onClick={closeMobileMenu}>
                                <div className='nav-buttonUS'><HiUsers /></div>
                            </Link>
                        </li>
                        <li className='nav-itemUS'>
                            <Link to='/chats' className='nav-linksUS' onClick={closeMobileMenu}>
                                <div className='nav-buttonUS'><HiChatAlt2 /></div>
                            </Link>
                        </li>
                        <li className='nav-itemUS'>
                            <Link to='/user-home' className='nav-linksUS' onClick={closeMobileMenu}>
                                <div className='nav-buttonUS'><HiUser /></div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NavbarU;
