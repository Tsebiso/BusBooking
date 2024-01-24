const { Router } = require('express')
const router = Router()
const account = require('../controllers/accountController')
const auth = require('../middleware/authentication')


// CREATE ACCOUNT
router.post('/create-account', auth.verifyToken, account.createAccount)

// UPDATE ACCOUNT BALANCE AFTER DEPOSIT
router.post('/balance', auth.verifyToken, account.updateBalance)

// UPDATE ACCOUNT BALANCE AFTER BOOKING
router.post('/deduct', auth.verifyToken, account.minusBalance)

// GET ACCOUNT BALANCE
router.get('/get-balance/:customerId', account.getAccountBalance)

module.exports = router