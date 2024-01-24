const pool = require('../psql/postgres')
const ObjectsToCsv = require('objects-to-csv')

const usersReport = (req, res) => {
  const SQL = {
    text: `SELECT firstname, lastname, email, phonenumber
    FROM users
    WHERE usertype != 'admin'`
  }

  pool.query(SQL.text).then(async response => {
    if (response) {
      const data = response.rows
      const csv = new ObjectsToCsv(data)

      // SAVE TO FILE
      await csv.toDisk('./users.csv')
      return res.download('./users.csv')
    }
    else {
      return res.status(404).json({ error: 'Users not found' })
    }
  }).catch(err => {
    console.log({ err })
    return res.status(400).json({ error: 'Internal Server Error' })
  })
}

const busRoutesReport = (req, res) => {
  const SQL = {
    text: `SELECT b.bus_id, busname, totdistance, tottrips, origin, destination, fare
    FROM bus b, routes r
    WHERE b.bus_id = r.bus_id
    ORDER BY bus_id ASC`
  }

  pool.query(SQL.text).then(async response => {
    if (response) {
      return res.status(200).json(response.rows)
    }
    else {
      return res.status(404).json({ error: 'Cannot get bus report' })
    }
  }).catch(err => {
    console.log(err)
  })
}

module.exports = { usersReport, busRoutesReport }