const got = require('got')

module.exports = function makeRequest(url) {
    return got(url).then(res => JSON.parse(res.body))
}
