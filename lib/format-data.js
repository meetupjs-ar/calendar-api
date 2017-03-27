const ColorHash = require('color-hash')
const colorHash = new ColorHash()
const moment = require('moment')

moment.locale('es')

function getFormattedEvent (rawEvent) {
    const newFields = {
        // obtenemos un color único para el evento en base al nombre
        color: colorHash.hex(rawEvent.eventName),
        // obtenemos el objecto fecha nativo de JavaScript
        date: rawEvent.date.toDate()
    }

    return Object.assign({}, rawEvent, newFields)
}

function sortEventsByDate (event1, event2) {
    if (event1.date.isAfter(event2.date)) return 1
    else if (event2.date.isAfter(event1.date)) return -1
    else return 0
}

module.exports = function formatData (allEvents) {
    // creamos un array con todos los eventos donde la la propiedad 'date' es un moment
    const events = allEvents.map(e => Object.assign({}, e, { date: moment(e.date) }))
    // array de resultados
    const eventSchedule = []
    const today = moment()
    const extraMonths = 12 - today.month()

    // añadimos los eventos de este mes
    eventSchedule.push({
        when: {
            month: today.format('MMMM'),
            year: today.format('YYYY')
        },
        events: events
            // eventos de este mes cuyo día todavía no haya pasado
            .filter(event => event.date.isSame(today, 'month') && !event.date.isBefore(today, 'day'))
            .sort(sortEventsByDate)
            .map(getFormattedEvent)
    })

    // este ciclo es para completar los eventos de los meses restantes del año
    for (let i = 1; i < extraMonths; i++) {
        const currentMonth = moment(today).add(i, 'month')

        eventSchedule.push({
            when: {
                month: currentMonth.format('MMMM'),
                year: currentMonth.format('YYYY')
            },
            events: events
                // eventos que pertenezcan al mes actual
                .filter(event => event.date.isSame(currentMonth, 'month'))
                .sort(sortEventsByDate)
                .map(getFormattedEvent)
        })
    }

    return eventSchedule
}
