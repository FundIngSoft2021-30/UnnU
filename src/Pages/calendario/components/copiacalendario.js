import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    daysOfWeek,
    createDaysForCurrentMonth,
    createDaysForNextMonth,
    createDaysForPreviousMonth,
    isWeekendDay,
    getMonthDropdownOptions,
    getYearDropdownOptions
} from "./helpers";
import {
    auth, db
} from "../../../DB/firebase";


Calendar.propTypes = {
    className: PropTypes.string,
    yearAndMonth: PropTypes.arrayOf(PropTypes.number).isRequired,
    onYearAndMonthChange: PropTypes.func.isRequired,
    renderDay: PropTypes.func
};
export default function Calendar({
    className = "",
    yearAndMonth = [2021, 11],
    onYearAndMonthChange,
    renderDay = () => null

}) {

    const [user, loading, error] = useAuthState(auth);
    const [fecha, setFecha] = useState("");

    const [descripcion, setDescipcion] = useState("");
    const [lugar, setLugar] = useState("");

    const [nombre, setNombre] = useState("");
    const [uid, setUid] = useState("");
    const history = useHistory();
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
    };

    const fetchUserdata = async () => {
        try {
            const query = await db
                .collection("eventos")
                .get();
            const data = await query.docs[0].data();
            setUid(data.uid);
            setFecha(data.fecha);
            setDescipcion(data.descripcion);
            setLugar(data.lugar);
            setNombre(data.nombre);

        } catch (err) {
            console.error(err);
            alert("Se ha producido un error al obtener los datos del usuario");
        }
    };

    useEffect(() => {

        if (loading) return;
        if (!user) return history.replace("/");
        fetchUserdata();
    }, [user, loading])

    const [year, month] = yearAndMonth;

    let currentMonthDays = createDaysForCurrentMonth(year, month);
    let previousMonthDays = createDaysForPreviousMonth(
        year,
        month,
        currentMonthDays
    );
    let nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);
    let calendarGridDayObjects = [
        ...previousMonthDays,
        ...currentMonthDays,
        ...nextMonthDays
    ];

    const compararfechas = (fecha, dia) => {
        if (fecha.valueOf.day === dia) {
        }
    }
    console.log("a" + calendarGridDayObjects.filter(compararfechas));
    const handleMonthNavBackButtonClick = () => {
        let nextYear = year;
        let nextMonth = month - 1;
        if (nextMonth === 0) {
            nextMonth = 12;
            nextYear = year - 1;
        }
        onYearAndMonthChange([nextYear, nextMonth]);
    };

    const handleMonthNavForwardButtonClick = () => {
        let nextYear = year;
        let nextMonth = month + 1;
        if (nextMonth === 13) {
            nextMonth = 1;
            nextYear = year + 1;
        }
        onYearAndMonthChange([nextYear, nextMonth]);
    };

    const handleMonthSelect = (evt) => {
        let nextYear = year;
        let nextMonth = parseInt(evt.target.value, 10);
        onYearAndMonthChange([nextYear, nextMonth]);
    };

    const handleYearSelect = (evt) => {
        let nextMonth = month;
        let nextYear = parseInt(evt.target.value, 10);
        onYearAndMonthChange([nextYear, nextMonth]);
    };

    return (
        <div className="calendar-root">
            <div className="navigation-header">
                <div className="month-nav-arrow-buttons">
                    <button onClick={handleMonthNavBackButtonClick}>Prev</button>
                    <button onClick={handleMonthNavForwardButtonClick}>Sig</button>
                    <Link to="/calendario/agregar">
                        <button>Crear evento</button>
                    </Link>
                </div>
                <select
                    className="month-select"
                    value={month}
                    onChange={handleMonthSelect}
                >
                    {getMonthDropdownOptions().map(({ label, value }) => (
                        <option value={value} key={value}>
                            {label}
                        </option>
                    ))}
                </select>
                <select
                    className="year-select"
                    value={year}
                    onChange={handleYearSelect}
                >
                    {getYearDropdownOptions(year).map(({ label, value }) => (
                        <option value={value} key={value}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="days-of-week">
                {daysOfWeek.map((day, index) => (
                    <div key={day} className={classNames("day-of-week-header-cell", { "weekend-day": [6, 0].includes(index) })}>
                        {day}

                    </div>
                ))}
            </div>
            <div className="days-grid">

                {calendarGridDayObjects.map((day) => (
                    <button key={day.dateString} className={classNames("day-grid-item-container", { "weekend-day": isWeekendDay(day.dateString), "current-month": day.isCurrentMonth })} >
                        <div className="day-content-wrapper">{renderDay(day)}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}

CalendarDayHeader.propTypes = {
    calendarDayObject: PropTypes.object.isRequired
};
export function CalendarDayHeader({ calendarDayObject }) {
    return (
        <div className="day-grid-item-header">{calendarDayObject.dayOfMonth}</div>
    );
}


/*
function BuscarDia() {
    {
    meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    lasemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    diassemana = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"];
    }
    window.onload = function () {
        //fecha actual
        hoy = new Date(); //objeto fecha actual
        diasemhoy = hoy.getDay(); //dia semana actual
        diahoy = hoy.getDate(); //dia mes actual
        meshoy = hoy.getMonth(); //mes actual
        annohoy = hoy.getFullYear();
        tit = document.getElementById("titulos"); //cabecera del calendario
        ant = document.getElementById("anterior"); //mes anterior
        pos = document.getElementById("posterior"); //mes posterior
        // Elementos del DOM en primera fila
        f0 = document.getElementById("fila0");
        pie = document.getElementById("fechaactual");
        pie.innerHTML += lasemana[diasemhoy] + ", " + diahoy + " de " + meses[meshoy] + " de " + annohoy;
        //formulario: datos iniciales:
        document.buscar.buscaanno.value = annohoy;
        mescal = meshoy; //mes principal
        annocal = annohoy; //año principal
        //iniciar calendario:
        cabecera()
        primeralinea()
        escribirdias()
    }
}

function CalendarSC() {
    return (
        <div>
            <h1>pantalla Calendario</h1>

            <br /><br />
            <div id="calendario">
                <div id="anterior" onclick="mesantes()"></div>
                <div id="posterior" onclick="mesdespues()"></div>
                <h2 id="titulos"></h2>


                <table id="diasc">
                    <tr id="fila0"><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>
                    <tr id="fila1"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr id="fila2"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr id="fila3"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr id="fila4"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr id="fila5"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr id="fila6"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                </table>

                <div id="fechaactual"><i onclick="actualizar()">HOY: </i> BuscarDia() </div>

                <div id="buscafecha">
                    <form action="#" name="buscar">
                        <p>Buscar ... MES
                            <select name="buscames">
                                <option value="0">Enero</option>
                                <option value="1">Febrero</option>
                                <option value="2">Marzo</option>
                                <option value="3">Abril</option>
                                <option value="4">Mayo</option>
                                <option value="5">Junio</option>
                                <option value="6">Julio</option>
                                <option value="7">Agosto</option>
                                <option value="8">Septiembre</option>
                                <option value="9">Octubre</option>
                                <option value="10">Noviembre</option>
                                <option value="11">Diciembre</option>
                            </select>
                            ... AÑO ...
                            <input type="text" name="buscaanno" maxlength="4" size="4" />
                            ...
                            <input type="button" value="BUSCAR" onclick="mifecha()" />
                        </p>
                    </form>
                </div>

            </div>

        </div>

    );
}
char vec[10] = { a, b, c, d, e, f, g, h, i, j }
for (int i = 0; i < 2; i++) {
    int p = 10
    for (int cont = 0; cont < 10; vec++) {
        for (int n = p; n > 0 ; n--) {
            for (int j = 0; j < 50; j++) {
                nombreMatriz[j][i] = vec[cont];
            }
        }
        p--;
    }
}

*/
