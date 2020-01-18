const Reporter = require('../../models/reporter')

module.exports = function (router) {
    // GET: the 12 newest stand-up meeting notes
    router.get('/getReporters', function (request, response) {
        Reporter.find()
            .select({ 'reporter': 1 })
            .sort({ 'reporter': 1 })
            .exec()
            .then(docs => response.status(200).json(docs))
            .catch(error => response.status(400)
                .json({
                    message: "Something went wrong in the route",
                    error: error
                }))
    })

}