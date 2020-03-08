const Status = require('../../models/status')

module.exports = function (router) {

    router.post('/addStatus', function (request, response) {
        let status = new Status(request.body)
        status.save(function (error, status) {
            if (error && (error.code = 11000)) {
                return response.status(400).json({
                    message: 'Denna statusen finns redan',
                    code: 2
                })
            } else if (error) {
                return response.status(400).json(error)
            }
            response.status(200).json(status)
        })
    })
}
