const { Router } = require('express')
const router = Router()
const confirm = require('../controllers/confirm')
const auth = require('../middleware/authentication')

router.post('/mail', confirm.sendBookingEmail)

module.exports = router