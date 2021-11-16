import React, { useEffect, useState, Component } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import "./homeuser.css";
import {
  auth,
  db,
  deleteAccount,
  deletedbxUser,
  logout
} from "../../../DB/firebase";
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
      setGustos(data.gustos.map(gusto => <div>{gusto.label}</div>));
      setFacultad(data.facultad.value);
      setCarrera(data.carrera.value);
      setphotoPerfil(data.photoPerfil);
      setUid(data.uid);
    } catch (err) {
      console.error(err);
      alert("Se ha producido un error al obtener los datos del usuario");
    }
  };

  const deleteuserAll = async () => {
    deleteAccount(photoPerfil)
    deletedbxUser()
  }

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })


  const deletButton = () => {
    Swal.fire({
      title: 'Quieres eliminar tu cuenta?',
      text: "Recuerda que no se puede revertir la eliminacion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result) {
        deleteuserAll();
        Swal.fire(
          'Borrada!',
          'Tu cuenta ha sido borrada.',
          'success'
        )
      }
    })
  }





  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");

    fetchUserdata();
  }, [user, loading]);

  return (
    <div className="editbg">
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
          <div className='redondo'>{genero}</div>
          <div>Carrera <div className='redondo'>{carrera}</div></div>
          <div>Facultad <div className='redondo'>{facultad}</div></div>
          <div>
            tus gustos son:
            <div className='redondo'>{gustos}</div>

          </div>

          <Link to='/Editprofile' className='btn-mobile'>
            <button className="dashboard__btnedit" >
              Editar perfil
            </button>
          </Link>

          <button className="dashboard__btndelete" onClick={deletButton}>
            Borrar cuenta
          </button>

          <button className="dashboard__btnlogut" onClick={logout}>
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}

export default Homeuser;


