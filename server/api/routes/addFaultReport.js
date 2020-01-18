const faultReport = require('../../models/faultReport')

module.exports = function (router) {

    router.post('/addFaultReport', function (request, response) {
        let faultReportRequestBody = new faultReport(request.body)
        faultReportRequestBody.save(function (err, faultReportRequestBody) {
            if (err) {
                return response.status(400).json(err)
            }
            response.status(200).json(faultReportRequestBody)
        })
    })

}
