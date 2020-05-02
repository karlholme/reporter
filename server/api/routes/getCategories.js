const Category = require('../../models/category')

module.exports = function (router) {
    router.get('/getCategories', function (request, response) {
        Category.find()
            .select({ 'category': 1 })
            .sort({ 'category': 1 })
            .exec()
            .then(docs => response.status(200).json(docs))
            .catch(error => response.status(400)
                .json({
                    message: "Something went wrong in the route",
                    error: error
                }))
    })

}