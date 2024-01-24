const { Router } = require('express')
const router = Router()
const reportController = require('../controllers/reportController')
const auth = require('../middleware/authentication')

//USERS REPORT
router.get('/users-report', reportController.usersReport)

//ROUTES REPORT
router.get('/route-report', reportController.busRoutesReport)

module.exports = router