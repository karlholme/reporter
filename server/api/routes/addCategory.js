const Category = require('../../models/category')

module.exports = function (router) {

    router.post('/addCategory', function (request, response) {
        let category = new Category(request.body)
        category.save(function (error, category) {
            if (error && (error.code = 11000)) {
                return response.status(400).json({
                    message: category.category + ' verkar redan var tillagd!',
                    code: 2
                })
            } else if (error) {
                return response.status(400).json(error)
            }
            response.status(200).json(category)
        })
    })
}
