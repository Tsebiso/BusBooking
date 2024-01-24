const pool = require('../psql/postgres')

const updateBusTable = (req, res) => {
  const subQuery = {
    text: `SELECT bus_id, distance 
    FROM routes
    WHERE bus_id = $1`,
    value: [req.body.bus_id]
  }

  pool.query(subQuery.text, subQuery.value).then(response => {
    if (response) {
      const distance = response.rows[0].distance

      const bus = {
        text: `SELECT * FROM bus WHERE bus_id = $1`,
        value: [req.body.bus_id]
      }

      pool.query(bus.text, bus.value).then(response => {
        if (response) {
          const queryItems = {
            totdistance: response.rows[0].totdistance,
            tottrips: response.rows[0].tottrips
          }

          queryItems.totdistance = parseInt(queryItems.totdistance) + parseInt(distance)
          queryItems.tottrips = parseInt(queryItems.tottrips) + 1

          console.log({ queryItems })

          const updateStatement = {
            text: `UPDATE bus SET totdistance = $2, tottrips = $3
            WHERE bus_id = $1`,
            value: [req.body.bus_id, queryItems.totdistance, queryItems.tottrips]
          }

          pool.query(updateStatement.text, updateStatement.value).then(response => {
            if (response.rowCount > 0) {
              return res.status(200).json({ success: true })
            } else {
              return res.status(400).json({ error: "Unable to update bus table!" });
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }).catch(err => {
    console.log(err)
  })
}

const busyRoad = (req, res) => {
  const joinQuery = {
    text: `SELECT b.bus_id, busname, totdistance, tottrips, origin, destination, fare
    FROM bus b, routes r
    WHERE b.bus_id = r.bus_id
    ORDER BY bus_id ASC`
  }

  pool.query(joinQuery.text).then(response => {
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

module.exports = { updateBusTable, busyRoad }