"use strict";
const express = require('express')
const app = express()
const nodemailer = require("nodemailer");
require('dotenv').config()

const enviar = _ => {
  let transporter = nodemailer.createTransport({
    host: process.env.AWS_SES_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.AWS_SES_USER, // generated ethereal user
      pass: process.env.AWS_SES_PASS, // generated ethereal password
    },
  });

  transporter.sendMail({
    from: '"Fred Foo 👻" <tecnologia@hpcap.com.br>', // sender address
    to: "icaro.albar@hpcap.com.br", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Teste Nº 10</b>", // html body
  }).then(message => console.log(message))
    .catch(err => console.log(err))
}

app.get('/', (req,res) => {
  res.send('Icaro Albar')
})

app.get('/send', (req,res) => {
  enviar()
})

app.listen(4000, (req, res) => console.log('SERVIDOR EM FUNCIONAMENTO...'))