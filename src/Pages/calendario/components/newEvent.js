import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import makeAnimated from 'react-select/animated';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import 'react-calendar/dist/Calendar.css';
import {
    auth,
    crearEvento,
    db
} from "../../../DB/firebase";
import './newEvent.css'

import { HiArrowLeft } from "react-icons/hi";

const animatedComponents = makeAnimated();


function NewEvent() {
    const [user, loading, error] = useAuthState(auth);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescipcion] = useState("");
    const [hora, setHora] = useState("");
    const [lugar, setLugar] = useState("");
    const [uid, setUid] = useState("");
    const [startDate, setStartDate] = useState("");
    const history = useHistory();

    const fetchUserdata = async () => {
        try {
            const query = await db
                .collection("usuarios")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setUid(data.uid);
        } catch (err) {
            console.error(err);
            alert("Se ha producido un error al obtener los datos del usuario");
        }
    };


    const CrearEvento = () => {
        if (!nombre) alert("");

        crearEvento(nombre, descripcion, startDate, lugar, uid);
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return history.replace("/");

        fetchUserdata();
    }, [user, loading]);
    return (
        <div className="editbg">
            <div className="edit">
                <Link to='/calendario' className='btn-mobile'>
                    <button className="arts__btn" data-testid="ArrowBackIcon">
                        <HiArrowLeft />
                    </button>
                </Link>
                <div className="edit__container">
                    <h1>Crear Evento</h1>


                    <input
                        type="text"
                        className="register__textBox"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre del evento"
                    />
                    <input
                        type="text"
                        className="register__textBox"
                        value={descripcion}
                        onChange={(e) => setDescipcion(e.target.value)}
                        placeholder="Descripcion del evento"
                    />
                    <input
                        type="text"
                        className="register__textBox"
                        value={lugar}
                        onChange={(e) => setLugar(e.target.value)}
                        placeholder="Lugar del evento"
                    />
                    <DatePicker

                        value={startDate}
                        onChange={setStartDate}
                        inputPlaceholder="Selecciona un dia"
                        shouldHighlightWeekends
                    />
                    <Link to='/calendario' >
                        <button className="edit__btn" onClick={() => CrearEvento()}>
                            Crear evento
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NewEvent;



