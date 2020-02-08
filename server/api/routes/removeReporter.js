const Reporter = require('../../models/reporter')

module.exports = function (router) {

    router.put('/removeReporter', function (request, response) {
        Reporter.deleteOne({ _id: request.body.id }, function (error, mongooseDeleteResult) {
            if (mongooseDeleteResult.deletedCount == 1) {
                return response.status(200)
                    .json({
                        id: request.body.id,
                        message: 'Successfully removed',
                    })
                    .send()
            } else if (mongooseDeleteResult.deletedCount == 0) {
                return response.status(400)
                    .json({
                        message: 'There was no reporter with id ' + request.body.id,
                        errorCode: 400
                    })
                    .send();
            }
            return response.status(500)
                .json({
                    message: 'Reporter with id: ' + request.body.id + ' could not be removed',
                    errorCode: 500
                })
                .send();
        });
    })
}
