const Standup = require('../../models/faultReport')

module.exports = function (router) {
    // GET: the 12 newest stand-up meeting notes
    router.get('/getFaultReports', function (request, response) {
        Standup.find()
            .sort({ 'createdOn': 1 })
            .exec()
            .then(docs => response.status(200)
                .json(docs))
            .catch(error => response.status(400)
                .json({
                    message: "Something went wrong in the route",
                    error: error
                }))
    })

}