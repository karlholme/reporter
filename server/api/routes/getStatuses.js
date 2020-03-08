const Status = require('../../models/status')

module.exports = function (router) {
    // GET: the 12 newest stand-up meeting notes
    router.get('/getStatuses', function (request, response) {
        Status.find()
            .then(docs => response.status(200).json(docs))
            .catch(error => response.status(400)
                .json({
                    message: "Something went wrong in the route",
                    error: error
                }))
    })

}