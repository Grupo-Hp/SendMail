"use strict";
const express = require('express')
const app = express()
const nodemailer = require("nodemailer");
require('dotenv').config()

let transporter = nodemailer.createTransport({
  host: process.env.AWS_SES_HOST,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.AWS_SES_USER, // generated ethereal user
    pass: process.env.AWS_SES_PASS, // generated ethereal password
  },
});

app.get('/send', (req, res) => {
  transporter.sendMail({
    from: '"Fred Foo 👻" <tecnologia@hpcap.com.br>', // sender address
    to: "icaro.albar@hpcap.com.br", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Teste no servidor VIII</b>", // html body
  }).then(message => {
    console.log(message)
    console.log('E-MAIL ENVIADO!')
    res.send('e-mail enviado!')
  })
    .catch(err => console.log(err))
})

app.get('/', (req, res) => {
  res.send('Icaro Albar III')
})

app.listen(4000, (req, res) => console.log('SERVIDOR EM FUNCIONAMENTO...'))