const got = require('got')

module.exports = function makeRequest (url, options) {
    return got(url, options).then(res => JSON.parse(res.body))
}
