const pool = require('../psql/postgres')

//RECORD TRANSACTIONS
const recordTransactions = (req, res) => {
  console.log('request: ', req.body)
  const transactiontype = 'Credit'
  const plus = '+'
  const credit = req.body.amount
  const amount = plus.concat(credit)
  console.log('amount: R ', amount)

  let SQL = {
    text: `SELECT accountNo FROM account
     WHERE customerId = $1`,
    value: [req.body._id]
  }

  pool.query(SQL.text, SQL.value).then((selector) => {
    if (selector.rows[0]) {
      account = selector.rows[0].accountno
      console.log({ account })

      let query = {
        text: `INSERT INTO transactions ( _id, amount, accountNo, transactiontype ) 
            VALUES ($1, $2, $3, $4)`,
        value: [req.body._id, amount, account, transactiontype]
      }

      pool.query(query.text, query.value).then((response) => {
        if (response.rowCount > 0) {
          return res.status(200).json({ msg: 'Deposit successfully received' })
        } else {
          return res.status(400).json({ error: 'Failed to make deposit' })
        }
      }).catch((err) => {
        console.log(err)
      })
    } else {
      return res.status(400).json({ error: 'Failed to get account number' })
    }
  }).catch((err) => {
    console.log({ err })
    return res.status(500).json({ error: "Bad gateway" })
  })
}

//GET USER TRANSATIONS 
const getAllTransactions = (req, res) => {

  let query = {
    text: `SELECT * FROM transactions WHERE _id = $1`,
    value: [req.params._id]
  }

  pool.query(query.text, query.value).then((response) => {
    if (response.rowCount > 0) {
      return res.status(200).json(response.rows)
    } else {
      return res.status(404).json({error: 'No transaction record'})
    }
  }).catch((err) => {
    console.log(err)
    return res.status(400).json({ error: 'Failed to get user deposits' })
  })

}

// RECORD DEBITS
const recordDebit = (req, res) => {
  const transactiontype = 'Debit'
  const plus = '-'
  const debit = req.body.amount
  const amount = plus.concat(debit)


  let SQL = {
    text: `SELECT accountNo FROM account
     WHERE customerId = $1`,
    value: [req.body._id]
  }

  pool.query(SQL.text, SQL.value).then((selector) => {
    if (selector.rows[0]) {
      account = selector.rows[0].accountno
      console.log({ account })

      let query = {
        text: `INSERT INTO transactions ( _id, amount, accountNo, transactiontype ) 
            VALUES ($1, $2, $3, $4)`,
        value: [req.body._id, amount, account, transactiontype]
      }

      pool.query(query.text, query.value).then((response) => {
        if (response.rowCount > 0) {
          return res.status(200).json({ msg: 'Recorded successfully' })
        } else {
          return res.status(400).json({ error: 'Failed to make debit' })
        }
      }).catch((err) => {
        console.log(err)
      })
    } else {
      return res.status(400).json({ error: 'Failed to get account number' })
    }
  }).catch((err) => {
    console.log({ err })
    return res.status(500).json({ error: "Bad gateway" })
  })
}

module.exports = { recordTransactions, getAllTransactions, recordDebit }