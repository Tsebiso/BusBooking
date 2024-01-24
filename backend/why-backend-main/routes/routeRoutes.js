const { Router } = require('express')
const router = Router()
const busRoutesController = require('../controllers/routeController')
const auth = require('../middleware/authentication')

// INSERT INTO ROUTES TABLE
router.post('/insert-routes', auth.verifyToken, busRoutesController.addBusRoutes)
// SEARCH FOR A ROUTES
router.get('/search-route/:origin/:destination/:date', busRoutesController.searchBusRoutes)
// GET ALL ROUTES
router.get('/routes', busRoutesController.getBusRoutes)

module.exports = router