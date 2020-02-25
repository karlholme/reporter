const FaultReport = require('../../models/faultReport')

module.exports = function (router) {

    router.post('/updateFaultReport', function (request, response) {
        const update = {};
        update[request.body.fieldToUpdate] = request.body.newValue;
        FaultReport.findByIdAndUpdate(
            request.body.id,
            {
                $set: update
            },
            function (err, result) {
                if (err) {
                    response.send(err);
                } else {
                    response
                        .status(200)
                        .json({
                            updatedField: request.body.fieldToUpdate,
                            id: request.body.id
                        })
                        .send();
                }
            }
        )
    })
}
