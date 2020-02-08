const Reporter = require('../../models/reporter')

module.exports = function (router) {

    router.post('/addReporter', function (request, response) {
        let reporter = new Reporter(request.body)
        reporter.save(function (error, reporter) {
            if (error && (error.code = 11000)) {
                return response.status(400).json({
                    message: 'Gården är redan tillagd',
                    code: 2
                })
            } else if (error) {
                return response.status(400).json(error)
            }
            response.status(200).json(reporter)
        })
    })
}
