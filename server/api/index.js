const express = require('express')
const router = express.Router()

require('./routes/getFaultReports')(router)
require('./routes/addFaultReport')(router)

module.exports = router