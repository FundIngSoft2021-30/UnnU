import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import makeAnimated from 'react-select/animated';
import Select, { OnChangeValue } from 'react-select'
import {
  auth,
  registerWithEmailAndPassword
} from "../DB/firebase";


import '../../App.css';
import './SignUp.css'
const animatedComponents = makeAnimated();
const useroptions = [
  { value: 'Cocinar', label: 'Cocinar' },
  { value: 'Anime', label: 'Anime' },
  { value: 'Dibujar', label: 'Dibujar' },
  { value: 'Videojuegos', label: 'Videojuegos' },
  { value: 'Cafe', label: 'Cafe' },
  { value: 'Bailar', label: 'Bailar' },
  { value: 'Ciclismo', label: 'Ciclismo' },
  { value: 'Correr', label: 'Correr' },
  { value: 'Fotografia', label: 'Fotografia' },
  { value: 'Netflix', label: 'Netflix' },
  { value: 'Golf', label: 'Golf' },
  { value: 'Caminar', label: 'Caminar' },
  { value: 'Vino', label: 'Vino' },
  { value: 'Atletismo', label: 'Atletismo' },
  { value: 'Futbol', label: 'Futbol' },
  { value: 'Musica', label: 'Musica' },
  { value: 'Comedia', label: 'Comedia' },
  { value: 'Ingenieria4ever', label: 'Ingenieria4ever' },
  { value: 'CiendiasMedicas4ever', label: 'CiendiasMedicas4ever' },
  { value: 'Comunicacion4ever', label: 'Comunicacion4ever' },
  { value: 'ArquitecturayDiseño4ever', label: 'ArquitecturayDiseño4ever' },
  { value: 'Ciencias4ever', label: 'Ciencias4ever' },
  { value: 'Artes4ever', label: 'Artes4ever' },
  { value: 'CienciasEconi4ever', label: 'CienciasEconi4ever' }
]


function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [edad, setEdad] = useState("");
  const [carrera, setCarrera] = useState("");
  const [facultad, setFacultad] = useState("");
  const [gustos, setGustos] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();


  const [selectedOption, setSelectedOption] = useState(null);

  const [inputs, setInputs] = useState({
    label: ""
  })

  const changeHandle = e => {
    setInputs({
      ...inputs,
      [e.target.label]: e.target.value
    })
  }

  const submitHandle = e => {
    e.preventDefault()
    console.log(inputs)
  }


  const SignUp = () => {

    if (!name) alert("");
    registerWithEmailAndPassword(name, edad, email, carrera, facultad, gustos, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/user-home");
  }, [user, loading]);



  return (
    <div className="sign-upbg">
      <div className="register">
        <div className="register__container">
          <h1 className="logo">UNNU</h1>
          <h1>Crear cuenta</h1>
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
          <input
            type="text"
            className="register__textBox"
            value={carrera}
            onChange={(e) => setCarrera(e.target.value)}
            placeholder="Carrera"
          />
          <input
            type="text"
            className="register__textBox"
            value={facultad}
            onChange={(e) => setFacultad(e.target.value)}
            placeholder="Facultad"
          />
          <Select
            placeholder="Seleciona 5 pasiones..."
            className="Selectbox"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            defaultValue={selectedOption}

            options={useroptions}


          />
          setGustos(setSelectedOption)
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
