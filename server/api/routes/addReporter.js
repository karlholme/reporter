const Reporter = require('../../models/reporter')

module.exports = function (router) {

    router.post('/addReporter', function (request, response) {
        let reporter = new Reporter(request.body)
        reporter.save(function (error, reporter) {
            if (error) {
                return response.status(400).json(error)
            }
            response.status(200).json(reporter)
        })
    })

}
