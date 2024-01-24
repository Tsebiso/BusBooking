const pool = require('../psql/postgres')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const { response } = require('express')
const { error } = require('console')

const generateToken = (payload) => {
  return jwt.sign({ user_details: payload }, 'w', { expiresIn: '5h' })   // *issue: setting secret to .env.JWT_SECRET == undefined
}

const registerUser = (req, res) => {

  let accountStatus = true;
  if (req.body.firstName == '' || req.body.lastName == '' || req.body.email == '' || req.body.phoneNumber == '' || req.body.userType == '' || accountStatus == '' || req.body.password == '') {

    return res.status(400).json({ error: "Input field(s) cannot be empty!" });
  } else {
    if (req.body.userType == 'user') {


      if (req.body.password.length >= 8) {

        let password = bcrypt.hashSync(req.body.password, 10);
        let query = {
          text: `INSERT INTO users (firstName, lastName, email, phoneNumber, userType, accountStatus, password) 
          VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING _id, userType, firstName, lastName, email, phoneNumber, accountStatus`,
          value: [req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber, req.body.userType, accountStatus, password]
        }

        let usernameVerification = {
          text: `SELECT email, phoneNumber FROM users WHERE email = $1 OR phoneNumber = $2`,
          value: [req.body.email, req.body.phoneNumber]
        }

        pool.query(usernameVerification.text, usernameVerification.value).then((results) => {

          if (results.rowCount == 0) {
            pool.query(query.text, query.value).then(response => {

              if (response) {
                let payload = {
                  id: response.rows[0]._id,
                  userType: response.rows[0].userType
                }

                let stringPayload = JSON.stringify(payload);
                let token = generateToken(stringPayload); //jwt token

                let object = {
                  _id: response.rows[0]._id,
                  firstName: response.rows[0].firstname,
                  lastName: response.rows[0].lastname,
                  email: response.rows[0].email,
                  phoneNumber: response.rows[0].phonenumber,
                  accountStatus: response.rows[0].accountstatus,
                  token: token
                }

                return res.status(200).json(object)
              } else {
                return res.status(400).json({ error: "Unable to register user!" });

              }
            }).catch(err => {
              console.log(err);
              return res.status(500).json({ error: err })
            });
          } else {
            return res.status(400).json({ error: "Email/Phone Number already in use!" });
          }
        }).catch((err) => {
          console.log(err);
        })
      }
      else
        if (!validator.isStrongPassword(req.body.password)) {
          return res.status(400).json({ error: "Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters." });
        }
        else {
          return res.status(400).json({ error: "Password is less than 8 characters. Minimum is length is 8!" });
        }

    } else {
      return res.status(400).json({ error: "Incorrect userType!" });
    }
  }
};


const loginUser = (req, res) => {

  let username = req.body.username
  console.log(req.body)

  var usernameType = username.includes("@") ? "email" : "phoneNumber";

  let query = {
    text: `SELECT _id, firstName, lastName, email, phoneNumber, userType, password, accountStatus 
    FROM users WHERE ${usernameType} = $1`,
    value: [req.body.username]
  }

  pool.query(query.text, query.value).then(response => {

    if (response.rows[0]) {

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        response.rows[0].password);

      if (passwordIsValid) {

        let payload = {
          id: response.rows[0]._id,
          userType: response.rows[0].usertype
        }

        let stringPayload = JSON.stringify(payload);
        let token = generateToken(stringPayload); //jwt token

        let object = {
          _id: response.rows[0]._id,
          firstName: response.rows[0].firstname,
          lastName: response.rows[0].lastname,
          email: response.rows[0].email,
          phoneNumber: response.rows[0].phonenumber,
          accountStatus: response.rows[0].accountstatus,
          token: token
        }
        return res.status(200).json(object)
      } else {
        return res.status(400).json({ error: "Oops! The password you entered is incorrect" });

      }
    } else {
      return res.status(400).json({ error: "User not found!" });

    }
  }).catch(err => {
    console.log(err);
    return res.status(500).json({ error: err })
  });
};


// UPDATE USER
const updateProfile = (req, res) => {
  console.log('request: ', req.body)
  let query = {
    text: 'UPDATE users SET firstName = $2, lastName = $3, email = $4, phoneNumber = $5, updatedAt = NOW()  WHERE _id = $1',
    value: [req.body._id, req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber]
  }

  pool.query(query.text, query.value).then(response => {
    if (response.rowCount > 0) {
      return res.status(200).json({ success: true })
    } else {
      return res.status(400).json({ error: "Unable to update profile!" });
    }
  }).catch((err) => {
    console.log(err);
    return res.status(400).json({ error: "Unable to update profile!" });
  });
}

// GET ALL USERS
const getUsers = (req, res) => {

  let query = {
    text: "SELECT * FROM users WHERE userType != 'admin'"
  }

  pool.query(query.text).then(response => {
    console.log(response);
    if (response.rowCount > 0) {
      return res.status(200).json(response.rows)
    } else {
      return res.status(400).json({ error: "Unable to get all users" });
    }
  })
}

// DELETE USERS ACCOUNT
const deleteAccount = (req, res) => {
  const transactionSQL = {
    text: 'DELETE FROM transactions WHERE _id = $1',
    value: [req.params._id]
  }

  const accountSQL = {
    text: 'DELETE FROM account WHERE customerid = $1',
    value: [req.params._id]
  }

  const cardSQL = {
    text: 'DELETE FROM card WHERE _id = $1',
    value: [req.params._id]
  }

  const bookingSQL = {
    text: 'DELETE FROM booking WHERE _id = $1',
    value: [req.params._id]
  }

  const usersSQL = {
    text: 'DELETE FROM users WHERE _id = $1',
    value: [req.params._id]
  }

  pool.query(transactionSQL.text, transactionSQL.value).then(response => {
    console.log({ response })
    pool.query(accountSQL.text, accountSQL.value).then(response => {
      console.log({ response })
      pool.query(cardSQL.text, cardSQL.value).then(response => {
        console.log({ response })
        pool.query(bookingSQL.text, bookingSQL.value).then(response => {
          console.log({ response })
          pool.query(usersSQL.text, usersSQL.value).then(response => {
            console.log({ response })
            if (response) {
              res.status(200).send({ msg: 'Account deleted successfully' })
            }
          })
        })
      })
    })
  }).catch((err) => {
    console.log(err)
  })
}


module.exports = { registerUser, loginUser, updateProfile, getUsers, deleteAccount }