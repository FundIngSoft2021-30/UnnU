import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import "./homeuser.css";
import { auth, db, deleteAccount, logout } from "../../../DB/firebase";
import * as admin from "firebase-admin";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';



const animatedComponents = makeAnimated();
function Homeuser() {


  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [edad, setEdad] = useState("");
  const [genero, setGenero] = useState("");
  const [email, setEmail] = useState("");
  const [carrera, setCarrera] = useState("");
  const [facultad, setFacultad] = useState("");
  const [gustos, setGustos] = useState("");
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
      setEdad(data.edad);
      setGenero(data.genero.value);
      setGustos(data.gustos);
      setFacultad(data.facultad.value);
      setCarrera(data.carrera.value);
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
  }, [user, loading]);

  return (

    <div className="dashboard">
      <Link to='/match' className='btn-mobile'>
        <button className="arts__btn" data-testid="ArrowBackIcon">
          Back
        </button>
      </Link>
      <div className="dashboard__container">
        Conectado como
        <div><img class="profile" src={photoPerfil} alt="firebase-image" /></div>

        <div>{name} {edad}</div>
        <div>{genero}</div>
        <div>Carrera {carrera}</div>
        <div>Facultad {facultad}</div>
        <Select
          placeholder="Gustos..."
          className="Selectbox"
          value={gustos}
          defaultValue={[gustos[0], gustos[1], gustos[2], gustos[3], gustos[4]]}
          isMulti

        />
        <Link to='/Editprofile' className='btn-mobile'>
          <button className="dashboard__btnedit" >
            Editar perfil
          </button>
        </Link>
        <button className="dashboard__btndelete" onClick={() => deleteAccount(uid)}>
          Borrar cuenta
        </button>
        <button className="dashboard__btnlogut" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Homeuser;
