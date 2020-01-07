const faultReport = require('../../models/faultReport')

module.exports = function (router) {

    router.post('/addFaultReport', function (request, response) {
        let note = new faultReport(request.body)
        note.save(function (err, note) {
            if (err) {
                return response.status(400).json(err)
            }
            response.status(200).json(note)
        })
    })

}
