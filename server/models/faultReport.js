const mongoose = require('mongoose');
const { autoIncrement } = require('mongoose-plugin-autoinc');

const commentSchema = new mongoose.Schema({
    createdOn: { type: Date, default: Date.now },
    message: { type: String, required: true },
    reporter: { type: String, required: true }
})

const faultReportSchema = new mongoose.Schema({
    _id: Number,
    header: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: Number, min: 0, max: 1000 },
    propertyNumber: { type: Number },
    location: { type: String, required: true },
    reporter: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    status: { type: String, required: true },
    comments: { type: [commentSchema] }
})

faultReportSchema.plugin(autoIncrement, 'FaultReport');
module.exports = mongoose.model('FaultReport', faultReportSchema)
