const { Router } = require('express')
const router = Router()
const paymentController = require('../controllers/paymentController')
const auth = require('../middleware/authentication')

// CREATE CARD  
router.post('/add-card', auth.verifyToken, paymentController.createCreditCard)

// GET CREDIT CARD
router.get('/get-card/:_id', paymentController.getCreditCard)

// GET ALL CARDS
router.get('/allcards/:_id', paymentController.getAllCard)

module.exports = router