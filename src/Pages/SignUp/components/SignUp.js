import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Gustosoptions, carrerasOptions, facultadOptions, genderOptions, likes } from "../../Data/data"
import { MdAddAPhoto } from "react-icons/md";
import Swal from 'sweetalert2'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { red, blue, green } from "@material-ui/core/colors";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";

import {
  auth,
  registerWithEmailAndPassword,
  storage
} from "../../../DB/firebase";

import '../../../App.css';
import './SignUp.css'

const animatedComponents = makeAnimated();

function SignUp() {

  const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
  const headerStyle = { margin: 0 }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const marginTop = { marginTop: 5 }
  const [photoPerfil, setphotoPerfil] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchuid, setMatchuid] = useState(likes);
  const [likesdados, setLikesdados] = useState(likes);
  const [mensajes, setMensajes] = useState("");
  const [name, setName] = useState("");
  const [genero, setGenero] = useState("");
  const [edad, setEdad] = useState("");
  const [carrera, setCarrera] = useState("");
  const [facultad, setFacultad] = useState("");
  const [gustos, setGustos] = useState("");
  const [image, setImage] = useState(null);
  const [likesrecibidos, setLikesrecibidos] = useState(likes);
  const [progressBar, setProgress] = useState(0);
  const [numEventos, setNumEventos] = useState(0);
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  const [handleOpen, setHandleOpen] = useState({ open: false });
  const handleClick = () => {
    setHandleOpen({ open: true });
  };
  const matches = useMediaQuery("(max-width:600px)");

  const SignUp = () => {
    if (!name) alert("");
    registerWithEmailAndPassword(photoPerfil, name, genero, edad, email, carrera, facultad, mensajes, matchuid, likesdados, numEventos, likesrecibidos, gustos, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/primeros-pasos");
  }, [user, loading]);

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };


  const errorPhoto = () => {
    Swal.fire({
      title: 'Recuerda poner una foto antes de darle a subir foto.',
      text: "Los formatos soportados son JPEG, JPG, PNG",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    })
  }


  const handleUpload = () => {
    console.log(image);
    try {
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
    } catch (error) {
      console.log(error);
      errorPhoto();
    }
  };


  const AutoRotatingCarouselModal = ({ handleOpen, setHandleOpen, isMobile }) => {
    return (
      <div>
        {/* <Button onClick={() => setHandleOpen({ open: true })}>Open carousel</Button> */}
        <AutoRotatingCarousel
          label="Get started"
          open={handleOpen.open}
          onClose={() => setHandleOpen({ open: false })}
          onStart={() => setHandleOpen({ open: false })}
          autoplay={false}
          mobile={isMobile}
          style={{ position: "absolute" }}
        >
          <Slide
            media={
              <img src="http://www.icons101.com/icon_png/size_256/id_79394/youtube.png" />
            }
            mediaBackgroundStyle={{ backgroundColor: red[400] }}
            style={{ backgroundColor: red[600] }}
            title="This is a very cool feature"
            subtitle="Just using this will blow your mind."
          />
          <Slide
            media={
              <img src="http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png" />
            }
            mediaBackgroundStyle={{ backgroundColor: blue[400] }}
            style={{ backgroundColor: blue[600] }}
            title="Ever wanted to be popular?"
            subtitle="Well just mix two colors and your are good to go!"
          />
          <Slide
            media={
              <img src="http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png" />
            }
            mediaBackgroundStyle={{ backgroundColor: green[400] }}
            style={{ backgroundColor: green[600] }}
            title="May the force be with you"
            subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."
          />
        </AutoRotatingCarousel>
      </div>
    );
  };

  return (
    <div className="sign-upbg">



      <div className="register">
        <div className="register__container">
          <Link className="Linktxt" to='/' >
            <h1 className="logo">UNNU</h1>
          </Link>
          <div className="nav-buttons">
            <Link className="Linktxt" to="/login">
              <button id="loginBtn" >Iniciar sesion</button>
            </Link>
            <Link className="Linktxt" to="/sign-up">
              <button id="registerBtn" class="active">Crear cuenta</button>
            </Link>
          </div>
          <div class="picture-container">
            <div class="picture">
              <img src={photoPerfil} class="picture-src" id="wizardPicturePreview" /><MdAddAPhoto class="tamicon" />
              <input type="file" id="wizard-picture" onChange={handleChange} accept=".png, .jpg, .jpeg" />

            </div>
            <h6 className="textpic">
              Elegir la foto de perfil</h6>

          </div>
          <button className="edit__btn" onClick={() => setphotoPerfil(photoPerfil), handleUpload}>Subir foto</button>
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
          <button className="register__btn" onClick={SignUp} >
            Registrarse
          </button>
          <AutoRotatingCarouselModal
            isMobile={matches}
            handleOpen={handleOpen}
            setHandleOpen={setHandleOpen}
          />

        </div>
      </div>
    </div>
  );
}

export default SignUp;
