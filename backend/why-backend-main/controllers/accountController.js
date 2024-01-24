const pool = require('../psql/postgres')

// CREATE USER ACCOUNT
const createAccount = (req, res) => {
  console.log(req.body)
  let query = {
    text: `INSERT INTO account( accountNo, customerId, balance)
        VALUES ($1, $2, $3) RETURNING accountNo, customerId, balance`,
    value: [req.body.accountNo, req.body._id, req.body.balance]
  }

  let accountVerification = {
    text: `SELECT * FROM account
        WHERE accountNo = $1`,
    value: [req.body.accountNo]
  }

  pool.query(accountVerification.text, accountVerification.value).then((results) => {
    if (results.rowCount == 0) {
      pool.query(query.text, query.value).then(response => {
        if (response) {
          let account = {
            accountNo: response.rows[0].accountno,
            customerId: response.rows[0].customerid,
            balance: response.rows[0].balance
          }
          console.log({ account })
          return res.status(200).json(account)
        } else {
          return res.status(400).json({ error: 'unable to create user account' })
        }
      }).catch(err => {
        console.log({ err })
        return res.status(500).json({ error: err })
      })
    } else {
      return res.status(400).json({ error: 'account already exists' })
    }
  }).catch((err) => {
    console.log(err);
  })
}

// UPDATE ACCOUNT BALANCE
const updateBalance = (req, res) => {
  let SQL = {
    text: `SELECT balance 
      FROM account 
      WHERE customerId = $1`,
    value: [req.body._id]
  }

  pool.query(SQL.text, SQL.value).then(respo => {
    if (respo.rows[0]) {
      let oldBalance = respo.rows[0].balance
      console.log({ oldBalance })
      let incomingBalance = req.body.balance
      console.log({ incomingBalance })
      let newBalance = parseInt(oldBalance) + parseInt(incomingBalance)
      console.log({ newBalance })

      let query = {
        text: `UPDATE account SET balance = $2
        WHERE customerId = $1 RETURNING balance AS newBalance`,
        value: [req.body._id, newBalance]
      }

      pool.query(query.text, query.value).then(response => {
        if (response) {
          let balance = {
            newBalance: response.rows[0].newbalance
          }

          console.log({ balance })
          return res.status(200).json(balance)
        } else {
          return res.status(400).json({ error: "Unable to update balance" })
        }
      }).catch((err) => {
        console.log(err);
        return res.status(400).json({ error: "Unable to update balance details!" })
      })
    }
  }).catch((err) => {
    console.log({ err })
    return res.status(404).json({ error: "balance column not found!" })
  })
}

// MINUS FROM ACCOUNT AFTER BOOKING
const minusBalance = (req, res) => {
  let SQL = {
    text: `SELECT balance 
      FROM account 
      WHERE customerId = $1`,
    value: [req.body._id]
  }

  pool.query(SQL.text, SQL.value).then(respo => {
    if (respo.rows[0]) {
      let oldBalance = respo.rows[0].balance
      console.log({ oldBalance })
      let tripPrice = req.body.fare
      console.log({ tripPrice })
      let newBalance = parseInt(oldBalance) - parseInt(tripPrice)
      console.log({ newBalance })

      let query = {
        text: `UPDATE account SET balance = $2
        WHERE customerId = $1 RETURNING balance AS newBalance`,
        value: [req.body._id, newBalance]
      }

      pool.query(query.text, query.value).then(response => {
        if (response) {
          let balance = {
            newBalance: response.rows[0].newbalance
          }

          console.log({ balance })
          return res.status(200).json(balance)
        } else {
          return res.status(400).json({ error: "Unable to update balance" })
        }
      }).catch((err) => {
        console.log(err);
        return res.status(400).json({ error: "Unable to update balance details!" })
      })
    }
  }).catch((err) => {
    console.log({ err })
    return res.status(404).json({ error: "balance column not found!" })
  })
}

// GET ACCOUNT BALANCE
const getAccountBalance = (req, res) => {

  let query = {
    text: `SELECT * FROM account WHERE customerId = $1`,
    value: [req.params.customerId]
  }

  pool.query(query.text, query.value).then(response => {
    if (response.rowCount > 0) {
      const account = {
        accountno: response.rows[0].accountno,
        costomerId: response.rows[0].customerid,
        balance: response.rows[0].balance
      }

      return res.status(200).json(account)
    } else {
      return res.status(400).json({ error: "Unable to get account balance" });
    }
  })
}

module.exports = { createAccount, updateBalance, minusBalance, getAccountBalance }