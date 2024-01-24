const { Router } = require('express')
const router = Router()
const bookingController = require('../controllers/bookingController')
const auth = require('../middleware/authentication')

// RECORD NEW RESERVATIONS
router.post('/record-booking', auth.verifyToken, bookingController.recordBooking)

// GET CUSTOMER_RESERVATIONS
router.get('/current-user/:_id', bookingController.userReservations)

// UPDATE BOOKING STATUS
router.post('/booking-status', auth.verifyToken, bookingController.updateStatus)

// GET ALL RESERVATIONS
router.get('/reservations', auth.verifyToken, bookingController.allReservations)

module.exports = router