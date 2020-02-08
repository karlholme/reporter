const mongoose = require('mongoose');

const reporterSchema = new mongoose.Schema({
    reporter: { type: String, required: true, unique: true },
})

module.exports = mongoose.model('Reporter', reporterSchema)
