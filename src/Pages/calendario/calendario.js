
import CalendarioSC from "./components/calendarioSC";
import NavbarU from '../NavBarUser/NavBarUC';

function Calendario() {
  return (
    <>
      <NavbarU />
      <CalendarioSC />
    </>
  );
}

export default Calendario;




/*

import "./components/calendariosc.css";
import { useState } from "react";
import Calendar, { CalendarDayHeader } from "./components/calendariosc";
import NavbarU from '../NavBarUser/NavBarUC';

export default function App() {
  const [yearAndMonth, setYearAndMonth] = useState([2021, 9]);
  return (
    <div className="App">
     <NavbarU />
      <Calendar
        yearAndMonth={yearAndMonth}
        onYearAndMonthChange={setYearAndMonth}
        renderDay={(calendarDayObject) => (
          <div>
            <CalendarDayHeader calendarDayObject={calendarDayObject} />
          </div>
        )}
      />
    </div>
  );
}

*/