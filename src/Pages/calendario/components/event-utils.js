let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
    {
        id: createEventId(),
        title: 'sustentacion ingesoft',
        start: '2021-11-18' + 'T14:00:00',
    },
    {
        id: createEventId(),
        title: 'fin del semestre',
        start: '2021-11-29' + 'T23:00:00',
    }
]

export function createEventId() {
    return String(eventGuid++)
}