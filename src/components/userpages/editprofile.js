import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import * as admin from "firebase-admin";
import {
    auth,
    editprofile,
    db
} from "../DB/firebase";
import './editprofile.css'
function Editprofile() {


    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [edad, setEdad] = useState("");
    const [email, setEmail] = useState("");
    const [carrera, setCarrera] = useState("");
    const [facultad, setFacultad] = useState("");
    const [gustos, setGustos] = useState("");
    const [password, setPassword] = useState("");
    const [uid, setUid] = useState("");
    const history = useHistory();

    const Editprofile = () => {
        if (!name) alert("");
        editprofile(carrera, facultad, gustos);
    };

    const fetchUserdata = async () => {
        try {
            const query = await db
                .collection("usuarios")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setName(data.name);
            setEdad(data.edad);
            setEmail(data.email);
            setFacultad(data.facultad);
            setCarrera(data.carrera);
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
    }, [user, loading]);
    return (
        <div className="editbg">
            <div className="edit">
                <div className="edit__container">
                    <h1>Tu perfil</h1>
                    <div className="edit-text">{name} </div>
                    <div className="edit-text">{edad}</div>
                    <div className="edit-text">{email}</div>

                    <input
                        placeholder={facultad}
                        type="text"
                        className="edit-textBox"
                        onChange={(e) => setFacultad(e.target.value)}
                    />    

                    <input
                        placeholder={carrera}
                        type="text"
                        className="edit-textBox"
                        onChange={(e) => setCarrera(e.target.value)}
                    />

                    <Link to='/user-home' className='btn-mobile'>
                        <button className="edit__btn" onClick={Editprofile}>
                            Editar perfil
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Editprofile;