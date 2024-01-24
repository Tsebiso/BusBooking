const pool = require('../psql/postgres')

//SEARCH RECORD
const searchBusRoutes = (req, res) => {
  let SQL = {
    text: `SELECT id, busname, origin, destination, depart, arrive, fare, distance, firstName, lastName, r.bus_id
    FROM routes r, bus b, driver d
    WHERE r.bus_id = b.bus_id
    AND b.bus_id = d.driver_id
    AND origin = $1
    AND destination = $2
    ORDER BY origin ASC`,
    value: [req.params.origin, req.params.destination]
  }

  pool.query(SQL.text, SQL.value).then((response) => {
    if (response.rowCount > 0) {
      console.log('response', response)

      const newres = {
        date: req.params.date,
        response: response.rows
      }

      console.log('date', newres.date)
      console.log('check responce: ', newres.response)

      return res.status(200).json(newres)
    } else {
      return res.status(400).json({ error: `Sorry you can't select origin and destination as the same 😋` })
    }
  }).catch((err) => {
    console.log('error: ', err)
  })
}

//INSERT INTO BUS
const addBusRoutes = (req, res) => {
  console.log(req.body)
  let query = {
    text: `INSERT INTO routes (origin, destination, depart, arrive, fare, distance, bus_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    value: [req.body.origin, req.body.destination, req.body.depart, req.body.arrive, req.body.fare, req.body.distance, req.body.bus_id]
  }

  pool.query(query.text, query.value).then((response) => {
    if (response.rowCount > 0) {
      return res.status(201).json({ mgd: 'Route successfully added' })
    } else {
      return res.status(400).json({ mgd: 'Failed to add route' })
    }
  }).catch((err) => {
    console.error('error: ', err)
  })
}

// GET ALL BUSES
const getBusRoutes = (req, res) => {
  let SQL = {
    text: `SELECT * FROM routes`
  }

  pool.query(SQL.text).then(response => {
    console.log(response)
    if (response.rowCount > 0) {
      console.log('response: ', response)
      return res.status(200).json(response.rows)
    } else {
      return res.status(400).json({ error: 'Unable to get routes' })
    }
  })
}

module.exports = {
  searchBusRoutes,
  addBusRoutes,
  getBusRoutes
}