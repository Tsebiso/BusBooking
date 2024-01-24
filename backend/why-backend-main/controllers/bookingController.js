const { response } = require('express')
const pool = require('../psql/postgres')

// MAKE RESERVATIONS
const recordBooking = (req, res) => {
  console.log('request:', req.body)
  const status = 'Incomplete'
  const SQL = {
    text: `INSERT INTO booking (_id, bus_id, busname, route, seat, fare, departure, status)
    VALUES ($1, $2, $3, $4, $5 , $6, $7, $8)`,
    value: [
      req.body._id, req.body.bus_id, req.body.busname, req.body.route, req.body.seat, req.body.fare, req.body.departure, status
    ]
  }

  pool.query(SQL.text, SQL.value).then((response) => {
    if (response) {
      const ROWS = {
        text: 'SELECT * FROM booking WHERE _id = $1',
        value: [req.body._id]
      }

      pool.query(ROWS.text, ROWS.value).then((data) => {
        if (data) {
          return res.status(200).json(data.rows)
        }
      })
    } else {
      return res.status(400).json({ msg: 'Failed to book' })
    }
  }).catch((err) => {
    console.error(err)
  })
}

const userReservations = (req, res) => {
  const SQL = {
    text: `SELECT * FROM booking WHERE _id = $1`,
    value: [req.params._id]
  }

  pool.query(SQL.text, SQL.value).then(response => {
    if (response) {
      return res.status(200).json(response.rows)
    } else {
      return res.status(404).json({ error: 'No record found!' })
    }
  }).catch((err) => {
    console.log(err)
  })
}

//UPDATE BOOKING STATUS
const updateStatus = (req, res) => {
  const status = 'Complete'
  const SQL = {
    text: `UPDATE booking SET status = $2
      WHERE _id = $1
      AND bookingno = $3`,
    value: [req.body._id, status, req.body.bookingno]
  }

  pool.query(SQL.text, SQL.value).then(response => {
    if (response) {
      const RECORD = {
        text: 'SELECT * FROM booking WHERE _id = $1',
        value: [req.body._id]
      }

      pool.query(RECORD.text, RECORD.value).then(data => {
        if (response) {
          return res.status(200).json(data.rows)
        }
      }).catch((err) => {
        console.log(err)
      })
    } else {
      return res.status(400).json({ error: "Unable to update booking status" })
    }
  }).catch((err) => {
    console.log(err);
    return res.status(404).json({ error: "Not found" })
  })
}

// UPDATE BOOKING DATE
const updateBookingDate = (req, res) => {

}

// GET ALL RESERVATIONS
const allReservations = (req, res) => {
  const SQL = {
    text: `SELECT * FROM booking`
  }

  pool.query(SQL.text).then((response) => {
    if (response.rowCount > 0) {
      return res.status(200).json(response.rows)
    } else {
      return res.status(404).json({ error: "Unable to get all reservations" });
    }
  }).catch((err) => {
    console.log(err)
  })
}

module.exports = { recordBooking, userReservations, updateStatus, allReservations }