const { Pool, Client } = require('pg')
require('dotenv').config()

const connectionString = process.env.POSTGRES_URI
const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
      }
})

module.exports = pool