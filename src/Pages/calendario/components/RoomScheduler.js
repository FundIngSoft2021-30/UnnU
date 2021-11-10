import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import esLocale from '@fullcalendar/core/locales/es';
import './RoomScheduler.css'
import {
    auth,
    crearEvento,
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
    const [numEventos, setNumEventos] = useState();
    const [Eventsxuser, setEventsxuser] = useState(INITIAL_EVENTS);
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
            setNumEventos(data.numEventos);
        } catch (err) {
            console.error(err);
            alert("Se ha producido un error al obtener los datos del usuario");
        }
    };
    const fetchEventdata = async () => {
        try {
            const query = await db
                .collection("eventos")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setUid(data.uid);
            setNombreusuario(data.name);
            setEventsxuser(data.Eventsxuser);
        } catch (err) {
            console.error(err);
            alert("Se ha producido un error al obtener los datos del evento");
        }
    };



    useEffect(() => {
        if (loading) return;
        if (!user) return history.replace("/");

        fetchUserdata();
        if (numEventos !== 0) {
            fetchEventdata();
        }
    }, [user, loading]);

    const handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar
        const Eventos = [{
            id: createEventId(),
            title: title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
        }]
        const data = [];
        calendarApi.unselect()
        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay

            })
        }
        ++numEventos;
        data.push(Eventos);
        setEventsxuser(Eventos);
        console.log(numEventos);
        console.log(Eventos);
        CrearEvento();
    }

    const CrearEvento = () => {

        crearEvento(Eventsxuser, uid, nombreusuario);
    };
    const handleEventClick = (clickInfo) => {
        if (window.confirm(`Estas seguro de eliminar este evento? '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
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
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekNumbers={true}
                    weekends={state.weekendsVisible}
                    initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                    select={handleDateSelect}
                    eventContent={renderEventContent} // custom render function
                    eventClick={handleEventClick}
                /* you can update a remote database when these fire:
                eventAdd={function(){}}
                eventChange={function(){}}
                eventRemove={function(){}}
                */
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