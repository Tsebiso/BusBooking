const { Router } = require('express')
const router = Router()
const busController = require('../controllers/busController')
const auth = require('../middleware/authentication')

// IPDATE DISTANCE FOR BUSES
router.post('/update-table', busController.updateBusTable)
// router.post('/update-table', auth.verifyToken, transactionsController.recordDebit)

//GET BUS RECORD STAT
router.get('/get-record', auth.verifyUsertype, busController.busyRoad)

module.exports = router