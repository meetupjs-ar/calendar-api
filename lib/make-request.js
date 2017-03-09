const got = require('got')

// it returns directly the JSON of the response's body
module.exports = function makeRequest (url, options) {
    return got(url, options).then(res => JSON.parse(res.body))
}
