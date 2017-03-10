const ColorHash = require('color-hash')
const colorHash = new ColorHash()
const moment = require('moment')

function getFormattedEvent (rawEvent) {
    const newFields = {
        color: colorHash.hex(rawEvent.community),
        date: rawEvent.date.toDate()
    }

    return Object.assign({}, rawEvent, newFields)
}

function sortEventsByDate (event1, event2) {
    if (event1.date.isAfter(event2.date)) return 1
    else if (event2.date.isAfter(event1.date)) return -1
    else return 0
}

// it returns an array of events filtered and formatted by month
// (just the current one and the following)
module.exports = function formatData (allEvents) {
    const events = allEvents.map(e => Object.assign({}, e, { date: moment(e.date) }))
    const eventSchedule = []
    const today = moment()

    for (let i = 0; i < 6; i++) {
        const currentMonth = moment(today).add(i, 'month')

        eventSchedule.push({
            when: {
                month: currentMonth.format('MMMM'),
                year: currentMonth.format('YYYY')
            },
            events: events
                .filter(event => event.date.isSame(currentMonth, 'month'))
                .sort(sortEventsByDate)
                .map(getFormattedEvent)
        })
    }

    return eventSchedule
}
