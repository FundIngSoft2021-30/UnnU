import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import { Gustosoptions, carrerasOptions, facultadOptions } from "../Data/data"
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    auth,
    editprofile,
    db,
    storage
} from "../DB/firebase";
import './editprofile.css'

const animatedComponents = makeAnimated();
function Editprofile() {
    const [user, loading, error] = useAuthState(auth);
    const [photoPerfil, setphotoPerfil] = useState("");
    const [name, setName] = useState("");
    const [edad, setEdad] = useState("");
    const [email, setEmail] = useState("");
    const [carrera, setCarrera] = useState("");
    const [facultad, setFacultad] = useState("");
    const [gustos, setGustos] = useState("");
    const [uid, setUid] = useState("");
    const history = useHistory();
    const [image, setImage] = useState(null);
    const [progressBar, setProgress] = useState(0);
    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progressBar);
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(photoPerfil => {
                        setphotoPerfil(photoPerfil);
                    });
            }
        );
    };
    const Editprofile = () => {
        if (!name) alert("");
        editprofile(photoPerfil, carrera, facultad, gustos);
    };
    const fetchUserdata = async () => {
        try {
            const query = await db
                .collection("usuarios")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setphotoPerfil(data.photoPerfil);
            setName(data.name);
            setEdad(data.edad);
            setEmail(data.email);
            setGustos(data.gustos);
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
                <Link to='/user-home' className='btn-mobile'>
                    <button className="arts__btn" data-testid="ArrowBackIcon">
                        Back
                    </button>
                </Link>
                <div className="edit__container">
                    <h1>Tu perfil</h1>
                    <div class="picture-container">
                        <div class="picture">
                            <img src={photoPerfil} class="picture-src" id="wizardPicturePreview" alt="firebase-image" />
                            <input type="file" id="wizard-picture" onChange={handleChange} accept=".png, .jpg, .jpeg" />

                        </div>
                        <h6 className="text">
                            Elegir la foto de perfil</h6>

                    </div>
                    <button className="edit__btn" onClick={(e) => setphotoPerfil(photoPerfil), handleUpload}>Subir foto</button>

                    <div className="text">{name} </div>

                    <div className="text">{edad}</div>

                    <div className="text">{email}</div>
                    <label className="text" ><b>Carrera</b></label>
                    <Select
                        placeholder="Carrera..."
                        className="Selectbox"
                        components={animatedComponents}
                        options={carrerasOptions}
                        value={carrera}
                        onChange={setCarrera}

                    />
                    <label className="text" ><b>Facultad</b></label>
                    <Select
                        placeholder="Facultad..."
                        className="Selectbox"
                        components={animatedComponents}

                        options={facultadOptions}
                        value={facultad}
                        onChange={setFacultad}

                    />
                    <Select
                        placeholder="Gustos..."
                        className="Selectbox"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        options={Gustosoptions}
                        isMulti
                        value={gustos}
                        onChange={setGustos}
                    />


                    <Link to='/user-home' className='btn-mobile'>
                        <button className="edit__btn" >
                            Editar perfil
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Editprofile;