const { Router } = require('express')
const router = Router()
const transactionsController = require('../controllers/transactionsController')
const auth = require('../middleware/authentication')

// CREATE NEW DEPOSITS
router.post('/create-deposit', auth.verifyToken, transactionsController.recordTransactions)
// GET DEPOSITS
router.get('/get-deposit/:_id', transactionsController.getAllTransactions)

// MONEY GOING OUT
router.post('/debit', auth.verifyToken, transactionsController.recordDebit)

module.exports = router