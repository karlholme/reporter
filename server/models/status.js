const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    status: { type: String, required: true, unique: true },
})

module.exports = mongoose.model('Status', statusSchema)
