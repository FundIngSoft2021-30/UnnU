import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./homeuser.css";
import { auth, db, deleteAccount, logout } from "../DB/firebase";
import * as admin from "firebase-admin";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { ButtonED } from "../Button";


const animatedComponents = makeAnimated();
function Dashboard() {


  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [edad, setEdad] = useState("");
  const [email, setEmail] = useState("");
  const [carrera, setCarrera] = useState("");
  const [facultad, setFacultad] = useState("");
  const [gustos, setGustos] = useState("");
  const [uid, setUid] = useState("");
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
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{edad}</div>
        <div>{email}</div>
        <Select
          placeholder="Carrera..."
          className="Selectbox"
          defaultValue={[carrera[0]]}
          isMulti
          value={carrera}
        />
        <Select
          placeholder="Facultad..."
          className="Selectbox"
          defaultValue={[facultad[0]]}
          isMulti
          value={facultad}
        />
        <Select
          placeholder="Gustos..."
          className="Selectbox"
          value={gustos}
          defaultValue={[gustos[0], gustos[1], gustos[2], gustos[3], gustos[4]]}
          isMulti

        />
        <ButtonED className="dashboard__btn" >
          Editar perfil
        </ButtonED>
        <button className="dashboard__btn" onClick={() => deleteAccount(uid)}>
          Borrar cuenta
        </button>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
