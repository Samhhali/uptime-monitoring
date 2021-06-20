const nodemailer = require("nodemailer");
const config = require("../config/settings");
require('dotenv/config');

const email = process.env.EMAIL;
const pass = process.env.PASSWORD;

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        email: email,
        password: pass,
    },
});

module.exports.sendConfirmationEmail = (username, email, confirmationCode) => {
    console.log("Check");
    transport.sendMail({
        from: 'Application@example.com',
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
          <h2>Hello ${username}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:3000/api/auth/confirm/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
};



