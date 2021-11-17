import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from './event-utils'
import esLocale from '@fullcalendar/core/locales/es';
import './calendarioSC.css'
import {
    auth,
    crearEvento,
    eliminarEvento,
    db
} from "../../../DB/firebase";

function RoomScheduler() {

    const state = {
        weekendsVisible: true,
        currentEvents: []

    }
    const [user, loading] = useAuthState(auth);
    const [nombreusuario, setNombreusuario] = useState("");
    const [uid, setUid] = useState("");
    const [uidEV, setUidEV] = useState("");
    const [Eventsxuser, setEventsxuser] = useState([{}]);
    const history = useHistory();

    const fetchUserdata = async () => {
        try {
            const query = await db
                .collection("usuarios")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setUid(data.uid);
            setNombreusuario(data.name);

        } catch (err) {
            console.error(err);
            alert("Se ha producido un error al obtener los datos del usuario");
        }
    };
    const fetchEventdata = async () => {
        console.log("fetchEventdata");
        console.log(loading);
        console.log("fetchEventdata if");

        const query = await db
            .collection("eventos")
            .where("uid", "==", user?.uid)
            .get();
        if (query.docs.length > 0) {
            const data = await query.docs[0].data();
            setUidEV(data.uid);
            setEventsxuser(data.Eventsxuser);
        }


    };



    useEffect(() => {
        if (loading) return;
        if (!user) return history.replace("/");
        fetchEventdata();
        fetchUserdata();
        console.log("numero " + Eventsxuser.length);

    }, [user, loading]);

    const handleDateSelect = (selectInfo) => {
        let title = prompt('Introduzca un nuevo título para su evento')
        let calendarApi = selectInfo.view.calendar
        const data = [];
        calendarApi.unselect()
        console.log(!title);
        if (!title) {
            alert("No se ha introducido ningun titulo para el evento")
            title = prompt('Introduzca un nuevo título para su evento')
        }

        if (title !== null) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay

            })
        }
        const Eventos = [{
            id: createEventId(),
            title: title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
        }]
        fetchUserdata();
        if (title !== null) {
            Eventsxuser.push(Eventos[0]);
            setEventsxuser(Eventsxuser);
            CrearEvento();
        }

    }

    const CrearEvento = () => {

        crearEvento(Eventsxuser, uid, nombreusuario);
    };

    const handleEventClick = (clickInfo) => {
        if (window.confirm(`Estas seguro de eliminar este evento? '${clickInfo.event.title}'`)) {
            clickInfo.event.remove();

            for (let i = 0; i < Eventsxuser.length; i++) {
                if (Eventsxuser[i].title === clickInfo.event.title) {
                    Eventsxuser.splice(i, 1);
                }
            }
            setEventsxuser(Eventsxuser);
            console.log(Eventsxuser);
            eliminarEvento(uid, Eventsxuser);
        }
    }

    return (
        <div className='demo-app'>

            <div className='demo-app-main'>
                <FullCalendar
                    locale={esLocale}
                    themeSystem='Darkly'
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView='dayGridMonth'
                    //editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekNumbers={true}
                    initialEvents={true}
                    events={Eventsxuser}
                    weekends={state.weekendsVisible}
                    select={handleDateSelect}
                    eventContent={renderEventContent} // custom render function
                    eventClick={handleEventClick}
                />
            </div>
        </div>
    )



}
export default RoomScheduler;

function renderEventContent(eventInfo) {

    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

function renderSidebarEvent(event) {
    return (
        <li key={event.id}>
            <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
            <i>{event.title}</i>
        </li>
    )
}