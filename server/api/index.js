const express = require('express')
const router = express.Router()

require('./routes/getFaultReports')(router)
require('./routes/addFaultReport')(router)
require('./routes/updateFaultReport')(router)

require('./routes/addReporter')(router)
require('./routes/removeReporter')(router)
require('./routes/getReporters')(router)

require('./routes/addComment')(router)
require('./routes/removeComment')(router)

require('./routes/addStatus')(router)
require('./routes/getStatuses')(router)

require('./routes/addCategory')(router)
require('./routes/getCategories')(router)


module.exports = router