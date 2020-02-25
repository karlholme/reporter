const FaultReport = require('../../models/faultReport')

module.exports = function (router) {

    router.post('/addComment', function (request, response) {
        FaultReport.findByIdAndUpdate(
            request.body.id,
            {
                $push: { comments: request.body.comment }
            },
            function (err, result) {
                if (err) {
                    response.send(err);
                } else {
                    response
                        .status(200)
                        .json({
                            result: result,
                            message: 'comment added',
                            comment: request.comment,
                            id: request.body.id
                        })
                        .send();
                }
            }
        )
    })
}
