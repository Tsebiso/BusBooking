const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const userRoute = require('./routes/userRoutes')
const cardRoute = require('./routes/paymentRoutes')
const transactonsRoute = require('./routes/transactionsRoute')
const routeRoutes = require('./routes/routeRoutes')
const accountRoute = require('./routes/accountRoute')
const bookingRoute = require('./routes/bookingRoute')
const updateBus = require('./routes/updateBus')
const reportRoute = require('./routes/reportRoute')
const confirm = require('./routes/confirm')
const app = express()
require('dotenv').config()


const HOST = '0.0.0.0'
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and PostgreSQL API' })
})

app.use('/api/user', userRoute)
app.use('/api/account', accountRoute)
app.use('/api/card', cardRoute)
app.use('/api/deposits', transactonsRoute)
app.use('/api/route', routeRoutes)
app.use('/api/booking', bookingRoute)
app.use('/api/bus', updateBus)
app.use('/api/admin', reportRoute)
app.use('/send', confirm)

app.listen(PORT, HOST, () => {
    console.log('App listening on port: ', process.env.PORT)
})