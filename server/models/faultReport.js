const mongoose = require('mongoose');
const { autoIncrement } = require('mongoose-plugin-autoinc');


const faultReportSchema = new mongoose.Schema({
    header: { type: String, required: true, default: 'Felanmälan' },
    description: { type: String, required: true },
    priority: { type: Number, min: 0, max: 1000 },
    propertyNumber: { type: Number },
    location: { type: String, required: true },
    reporter: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
})

faultReportSchema.plugin(autoIncrement, 'FaultReport');
module.exports = mongoose.model('FaultReport', faultReportSchema)
