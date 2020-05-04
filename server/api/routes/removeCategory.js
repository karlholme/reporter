const Category = require('../../models/category')

module.exports = function (router) {

    router.put('/removeCategory', function (request, response) {
        Category.deleteOne({ _id: request.body.id }, function (error, mongooseDeleteResult) {
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
                        message: 'There was no category with id ' + request.body.id,
                        errorCode: 400
                    })
                    .send();
            }
            return response.status(500)
                .json({
                    message: 'Category with id: ' + request.body.id + ' could not be removed',
                    errorCode: 500
                })
                .send();
        });
    })
}
