const express = require('express')
const router = express.Router()

require('./routes/getFaultReports')(router)
require('./routes/addFaultReport')(router)

require('./routes/addReporter')(router)
require('./routes/removeReporter')(router)
require('./routes/getReporters')(router)

module.exports = router