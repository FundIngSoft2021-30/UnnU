import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Gustosoptions, carrerasOptions, facultadOptions, genderOptions } from "../../Data/data"
import { MdAddAPhoto } from "react-icons/md";
import {
  auth,
  registerWithEmailAndPassword,
  storage
} from "../../../DB/firebase";

import '../../../App.css';
import './SignUp.css'

const animatedComponents = makeAnimated();

function SignUp() {
  const [photoPerfil, setphotoPerfil] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchuid, setMatchuid] = useState("");
  const [likesdados, setLikesdados] = useState("");
  const [name, setName] = useState("");
  const [genero, setGenero] = useState("");
  const [edad, setEdad] = useState("");
  const [carrera, setCarrera] = useState("");
  const [facultad, setFacultad] = useState("");
  const [gustos, setGustos] = useState("");
  const [image, setImage] = useState(null);
  const [progressBar, setProgress] = useState(0);
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();


  const SignUp = () => {
    if (!name) alert("");
    registerWithEmailAndPassword(photoPerfil, name, genero, edad, email, carrera, facultad, matchuid, likesdados, gustos, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/match");
  }, [user, loading]);

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

  return (
    <div className="sign-upbg">
      <div className="register">
        <div className="register__container">
          <Link className="Linktxt" to='/' >
            <h1 className="logo">UNNU</h1>
          </Link>
          <h1>Crear cuenta</h1>
          <div class="picture-container">
            <div class="picture">
              <img src={photoPerfil} class="picture-src" id="wizardPicturePreview" /><MdAddAPhoto class="tamicon" />
              <input type="file" id="wizard-picture" onChange={handleChange} accept=".png, .jpg, .jpeg" />

            </div>
            <h6 className="text">
              Elegir la foto de perfil</h6>

          </div>
          <button className="edit__btn" onClick={(e) => setphotoPerfil(photoPerfil), handleUpload}>Subir foto</button>
          <br />
          <input
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre completo"
          />
          <input
            type="text"
            className="register__textBox"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            placeholder="Edad"
          />
          <Select
            placeholder="Genero..."
            className="Selectbox"
            components={animatedComponents}
            options={genderOptions}
            value={genero}
            onChange={setGenero}

          />
          <Select
            placeholder="Carrera..."
            className="Selectbox"
            components={animatedComponents}
            options={carrerasOptions}
            value={carrera}
            onChange={setCarrera}

          />
          <Select
            placeholder="Facultad..."
            className="Selectbox"
            defaultValue={[facultad[0]]}
            components={animatedComponents}
            options={facultadOptions}
            value={facultad}
            onChange={setFacultad}

          />
          <Select
            placeholder="Gustos..."
            className="Selectbox"
            closeMenuOnSelect={false}
            defaultValue={[gustos[0], gustos[1], gustos[2], gustos[3], gustos[4]]}
            components={animatedComponents}
            options={Gustosoptions}
            isMulti
            value={gustos}
            onChange={setGustos}
          />
          <input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electronico"
          />
          <input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <button className="register__btn" onClick={SignUp}>
            Registrarse
          </button>
          <div className="Linkbox">
            Ya tienes cuenta? <Link className="Linktxt" to="/login">Iniciar sesión </Link> ahora.
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
