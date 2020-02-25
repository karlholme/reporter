const FaultReport = require('../../models/faultReport')

module.exports = function (router) {

    router.put('/removeComment', function (request, response) {
        FaultReport.findOne({ _id: request.body.faultReportId }, function (err, faultReport) {
            if (err) {
                response.status(500).send();
            }

            faultReport.comments = faultReport.comments.filter(function (comment) {
                return comment._id != request.body.commentId;
            })

            faultReport.save(function (error, us) {
                if (error) {
                    response.status(500)
                        .json({
                            message: 'Comment with id: ' + request.body.commentId + ' could not be removed',
                            error: error,
                            errorCode: 500
                        })
                        .send();
                }
                response.status(200)
                    .json({
                        message: "Comment with id: " + request.body.commentId + " removed"
                    })
                    .send();
            });
        })
    })
}

