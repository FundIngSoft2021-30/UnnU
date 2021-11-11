import { range } from "ramda";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export const daysOfWeek = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado"
];

export const MonthsOfYear = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiempre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

export function getYearDropdownOptions(currentYear) {
  let minYear = currentYear - 4;
  let maxYear = currentYear + 5;
  return range(minYear, maxYear + 1).map((y) => ({ label: `${y}`, value: y }));
}

export function getMonthDropdownOptions() {
  return range(1, 13).map((m) => ({
    value: m,
    label: MonthsOfYear[m - 1]
  }));
}

export function getNumberOfDaysInMonth(year, month) {
  return dayjs(`${year}-${month}-01`).daysInMonth();
}

export function createDaysForCurrentMonth(year, month) {
  return [...Array(getNumberOfDaysInMonth(year, month))].map((_, index) => {
    return {
      dateString: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      Month:month,
      Year:year,
      isCurrentMonth: true
    };
  });
}

export function createDaysForPreviousMonth(year, month, currentMonthDays) {
  const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].dateString);
  const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday;

  const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].dateString).subtract(visibleNumberOfDaysFromPreviousMonth, "day").date();

  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => {
    return {
      dateString: dayjs(`${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`).format("YYYY-MM-DD"),
      dayOfMonth: previousMonthLastMondayDayOfMonth + index,
      isCurrentMonth: false,
      isPreviousMonth: true
    };
  });
}

export function createDaysForNextMonth(year, month, currentMonthDays) {
  const lastDayOfTheMonthWeekday = getWeekday(`${year}-${month}-${currentMonthDays.length}`);
  const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");
  const visibleNumberOfDaysFromNextMonth = 6 - lastDayOfTheMonthWeekday;

  return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
    return {
      dateString: dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: false,
      isNextMonth: true
    };
  });
}

export function getWeekday(dateString) {
  return dayjs(dateString).weekday();
}

export function isWeekendDay(dateString) {
  return [6, 0].includes(getWeekday(dateString));
}