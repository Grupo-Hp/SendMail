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
    from: `"Contato ${req.body.empresa}" <tecnologia@hpcap.com.br>`, // sender address
    to: "icaro.albar@hpcap.com.br", // list of receivers
    subject: `Mensagem do site ${req.body.empresa}`,
    text: `<b>Nome:</b>${req.body.nome}<br>
           <b>Email:</b>${req.body.email}<br>
           <b>Telefone:</b>${req.body.telefone}<br>
           <b>Assunto:</b>${req.body.assunto}<br>
           <b>Mensagem:</b>${req.body.mensagem}`,

    html: `<style>*{font-family:arial,sans-serif}a{text-decoration:none;color:#000}th,td{padding:8px}span{font-weight:800;padding-right:5px}h4,p{text-align:center}.logo{padding-bottom:10px;border-bottom:solid 4px #d3ae58}</style>
            <div class="logo">
            <img src="./logo${req.body.imagem}.svg" alt="Logo ${req.body.empresa}" width="100">
            </div>
            <div>
            <h2>Menssagem do site ${req.body.empresa}</h2>
            <table>
            <tr>
            <td><span>Nome:</span>${req.body.nome}</td>
            </tr>
            <tr>
            <td><span>E-mail:</span>${req.body.email}</td>
            </tr>
            <tr>
            <td><span>Telefone:</span>${req.body.telefone}</td>
            </tr>
            <tr>
            <td><span>Assunto:</span>${req.body.assunto}</td>
            </tr>
            <tr>
            <td><span>Mensagem:</span></td>
            </tr>
            <tr>
            <td style="text-align:justify">${req.body.mensagem}</td>
            </tr>
            </table>
            </div>
            <div>
            <p>Em breve, voltaremos com mais informativos do site.</p>
            <h4><a href="#">${req.body.empresa}</a></h4>
            </div>`
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