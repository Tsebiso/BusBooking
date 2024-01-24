const pool = require('../psql/postgres')
const nodemailer = require("nodemailer");

const sendBookingEmail = (req, res) => {
  const email = req.body.email
  const query = {
    text: `SELECT * FROM users WHERE email = $1`,
    value: [email]
  }

  pool.query(query.text, query.value).then(data => {
    if (data) {
      console.log({data})
      const name = data.rows[0].firstname + ' ' + data.rows[0].lastname
      addCandidateMailer(email, name)

      return res.status(201).json('mail sent successfully')
    } else {
      return res.status(401).json('Email not found');
    }
  }).catch(err => {
    console.log(err);
    return res.status(401).json(err);
  })
}

const Transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "mabs.chris9@gmail.com",
    pass: "qjxzcxuqxzvzehub"
  },
  tls: {
    rejectUnauthorized: false
  }
});

const addCandidateMailer = (email, name) => {
  let mailOptions = {
    from: 'mabs.chris9@gmail.com', // sender address
    to: email, // list of receivers
    //cc:'etlhako@gmail.com',
    subject: ' Thank you for your reservation with ebus', // Subject line
    // text: text, // plain text body
    html:
      `<h3>Hello ${name},</h3><br>
      <h3>Thank you for making a reservation.<br>
      
      We look forward to your visit and hope we will be enjoying your meal experience at [restaurant name] as much as we will be enjoying your company </h3><br>
      <h2><ul><u>See you very soon</u><h2/>
      visit our site at <a href="https://ebusbooking.vercel.app/">Visit ebus.com!</a><br><br>
      </ul><h3>
      kind Regards,<br>
      eBus
       </h3>`
    // html body
  };
  Transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    }
  });

}

module.exports = { sendBookingEmail }