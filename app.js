"use strict";
const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
const nodemailer = require("nodemailer");
require('dotenv').config()
app.use(express.json())

let transporter = nodemailer.createTransport({
  host: process.env.AWS_SES_HOST,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.AWS_SES_USER, // generated ethereal user
    pass: process.env.AWS_SES_PASS, // generated ethereal password
  },
});

app.post('/send', (req, res) => {
  transporter.sendMail({
    from: '"Contato HP Bank" <tecnologia@hpcap.com.br>', // sender address
    to: "icaro.albar@hpcap.com.br", // list of receivers
    subject: "Mensagem do site HP Bank",
    text: `<b>Nome:</b>${req.body.nome}<br>
           <b>Email:</b>${req.body.email}<br>
           <b>Telefone:</b>${req.body.telefone}<br>
           <b>Assunto:</b>${req.body.assunto}<br>
           <b>Mensagem:</b>${req.body.mensagem}`,

    html: `<b>Nome:</b>${req.body.nome}<br>
           <b>Email:</b>${req.body.email}<br>
           <b>Telefone:</b>${req.body.telefone}<br>
           <b>Assunto:</b>${req.body.assunto}<br>
           <b>Mensagem:</b>${req.body.mensagem}`
  }).then(message => {
    console.log(message)
    console.log('E-MAIL ENVIADO!')
    res.send('e-mail enviado!')
  }).catch(err => console.log(err))
})

app.get('/', (req, res) => {
  res.send('Servidor do Grupo HP')
})

app.listen(8080, (req, res) => console.log('SERVIDOR EM FUNCIONAMENTO...'))