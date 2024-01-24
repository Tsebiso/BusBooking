const pool = require('../psql/postgres')

const createCreditCard = (req, res) => {
  let cardStatus = true;

  const SQL = {
    text: `SELECT cardnumber FROM card WHERE cardnumber = $1`,
    value: [req.body.cardNumber]
  }

  const query = {
    text: `INSERT INTO card (_id, cardNumber, cardName, expiaryDate, cvvNumber, cardStatus) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING cardNumber, cardName, expiaryDate, cvvNumber`,
    value: [req.body._id, req.body.cardNumber, req.body.cardName, req.body.expiaryDate, req.body.cvvNumber, cardStatus]
  }

  pool.query(SQL.text, SQL.value).then((results) => {
    if (results.rowCount > 0) {
      return res.status(400).json({ error: 'Card already exists' })
    } else {
      pool.query(query.text, query.value).then((response) => {
        if (response) {
    
          let creditcard = {
            cardnumber: response.rows[0].cardnumber,
            cardname: response.rows[0].cardname,
            expiarydate: response.rows[0].expiarydate,
            cvvnumber: response.rows[0].cvvnumber
          }
          console.log({ creditcard })
          return res.status(200).json(creditcard)
        } else {
          return res.status(400).json({ msg: 'Failed to add card' })
        }
      }).catch((err) => {
        console.error(err)
      })
    }
  }).catch((err) => {
    console.error(err)
  })
}

const getCreditCard = (req, res) => {

  let query = {
    text: `SELECT * FROM card WHERE _id = $1 and cardstatus = 'true'`,
    value: [req.params._id]
  }

  pool.query(query.text, query.value).then((response) => {
    if (response.rowCount > 0) {

      let creditcard = {
        cardnumber: response.rows[0].cardnumber,
        cardname: response.rows[0].cardname,
        expiarydate: response.rows[0].expiarydate,
        cvvnumber: response.rows[0].cvvnumber
      }
      console.log({creditcard})
      return res.status(200).json(creditcard)
    } else {
      console.log('null', response.rows[0])
      return res.status(200).json(response.rows)
    }
  }).catch((err) => {
    console.log(err)
  })
}

const getAllCard = (req, res) => {
  console.log(req.params)
  const SQL = {
    text: `SELECT * FROM card WHERE _id = $1`,
    value: [req.params._id]
  }

  pool.query(SQL.text, SQL.value).then((response) => {
    if (response) {
      return res.status(200).json(response.rows)
    } else {
      return res.status(404).json({error: 'Currently you have no card available'})
    }
  }).catch((err) =>{
    console.log(err)
  })
}

module.exports = { createCreditCard, getCreditCard, getAllCard }