const { Router } = require("express");
const router = Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authentication')

//Login
router.post('/login', userController.loginUser);

//Regtration
router.post('/registration', userController.registerUser);

//Update user
router.post('/update-profile', auth.verifyToken, userController.updateProfile);

//get all users
router.get('/get-all/:token', auth.verifyToken, auth.verifyUsertype, userController.getUsers);

// deleteAccount
router.delete('/delete-account/:_id', userController.deleteAccount)

module.exports = router;