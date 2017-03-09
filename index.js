// if we're in development, we require an specific configuration located at '.env'
// at production, that configuration is setted directly and we don't use that file
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const formatData = require('./lib/format-data')
const makeRequest = require('./lib/make-request')
const microCors = require('micro-cors')
const moment = require('moment')
const { send } = require('micro')

const cors = microCors({
    allowMethods: ['GET']
})

moment.locale('es')

async function handler (req, res) {
    try {
        // we fetch the data from the endpoints
        const promises = [
            makeRequest(process.env.SPREADSHEET_API),
            makeRequest(process.env.MEETUP_API)
        ]
        // we store an array of arrays where each one correspond to each endpoint
        const allData = await Promise.all(promises)
        // we flatten 'allData' to have a 'one-level' array
        const rawData = [].concat(...allData)
        // we filter and format everything
        const data = formatData(rawData)

        send(res, 200, data)
    } catch (error) {
        send(res, 500, error.message)
    }
}

module.exports = cors(handler)
