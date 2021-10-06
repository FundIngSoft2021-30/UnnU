import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./homeuser.css";
import { auth, db, deleteAccount,logout } from "../DB/firebase";
import * as admin from "firebase-admin";
import {ButtonED} from "../Button";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [edad, setEdad] = useState("");
  const [email, setEmail] = useState("");
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
