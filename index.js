// si estamos en desarrollo, requerimos el archivo '.env'
// en producción, esa configuración se recibe directamente como variables de entorno
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const formatData = require('./lib/format-data')
const makeRequest = require('./lib/make-request')
const microCors = require('micro-cors')
const { send } = require('micro')

const cors = microCors({
    allowMethods: ['GET']
})

async function handler(req, res) {
    try {
        // creamos un array de promises con los request de los eventos a cada API
        const promises = [
            makeRequest(process.env.EVENTBRITE_API),
            makeRequest(process.env.MEETUP_API),
            makeRequest(process.env.SPREADSHEET_API)
        ]
        // allData será un array de arrays, donde cada posición tendrá los eventos de cada API
        const allData = await Promise.all(promises)
        // generamos un array de 1 solo nivel con todos los eventos de las 3 APIs combinadas
        const rawData = [].concat(...allData)
        // generamos el output
        const data = formatData(rawData)

        send(res, 200, data)
    } catch (error) {
        send(res, 500, error.message)
    }
}

module.exports = cors(handler)
