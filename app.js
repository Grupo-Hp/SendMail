"use strict";
const express = require('express')
const AWS = require('aws-sdk');
const { AwsConfig } = require('./Credenciais');
const cors = require('cors')
const app = express()
app.use(cors())
const nodemailer = require("nodemailer");
require('dotenv').config()
const { v4: uuidv4 } = require('uuid');

app.use(express.json())

let data = new Date();
let dia = String(data.getDate()).padStart(2, '0');
let mes = String(data.getMonth() + 1).padStart(2, '0');
let ano = data.getFullYear();
let date = dia + '/' + mes + '/' + ano;
let hora = new Date().toLocaleTimeString('pt-BR')

AWS.config.update(AwsConfig);
let ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });


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

let params = {
  TableName: "SEND_MAIL_SITES",
  Item: {
    'ID' : {S: uuidv4()},
    'DATA': { S: date },
    'HORA': { S: hora },
    'EMAIL': { S: `${req.body.email}` },
    'EMPRESA': { S: `${req.body.empresa}` },
    'NOME': { S: `${req.body.nome}` },
    'TELEFONE': { S: `${req.body.telefone}` }, 
    'ASSUNTO': { S: `${req.body.assunto}` },
    'MENSAGEM': { S: `${req.body.mensagem}` }
  }
};


  // Call DynamoDB to add the item to the table
  ddb.putItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });

  transporter.sendMail({
    from: `"Contato ${req.body.empresa} tecnologia@hpcap.com.br"`, // sender address
    to: "icaro.albar@hpcap.com.br", // list of receivers
    subject: `Mensagem do site ${req.body.empresa}`,
    text: `<b>Nome:</b>${req.body.nome}<br>
           <b>Email:</b>${req.body.email}<br>
           <b>Telefone:</b>${req.body.telefone}<br>
           <b>Assunto:</b>${req.body.assunto}<br>
           <b>Mensagem:</b>${req.body.mensagem}`,

    html: `<style>*{font-family:arial,sans-serif}a{text-decoration:none;color:#000}th,td{padding:8px}span{font-weight:800;padding-right:5px}h4,p{text-align:center}.logo{padding-bottom:10px;border-bottom:solid 4px #d3ae58}</style>
            <div class="logo">
            <img src="https://www.hpcap.com.br/logo${req.body.imagem}.svg" alt="Logo ${req.body.empresa}" width="100">
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
            <h4><a href="${req.body.site}">${req.body.empresa}</a></h4>
            </div>`
  }).then(message => {
    console.log(message)
    console.log('E-MAIL ENVIADO!')
    res.send('e-mail enviado!')
  }).catch(err => console.log(err))
})

app.post('/send/amil', (req, res) => {

  let params = {
    TableName: "LEADS_AMIL_SITE",
    Item: {
      'ID' : {S: uuidv4()},
      'DATA': { S: date },
      'HORA': { S: hora },
      'EMAIL': { S: `${req.body.email}` },
      'EMPRESA': { S: `${req.body.empresa}` },
      'NOME': { S: `${req.body.nome}` },
      'SOBRENOME': { S: `${req.body.sobrenome}` },
      'TELEFONE': { S: `${req.body.telefone}` },
      'CIDADE': { S: `${req.body.cidade}` }, 
      'TIPO': { S: `${req.body.tipo}` },
      'FORMA': { S: `${req.body.forma}` }
    }
  };
  
  
    //Call DynamoDB to add the item to the table
    ddb.putItem(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
  
    transporter.sendMail({
      from: `"Leads ${req.body.empresa} tecnologia@hpcap.com.br"`, // sender address
      to: "icaro.albar@hpcap.com.br", // list of receivers
      subject: `Novo preenchimento no site ${req.body.empresa}`,
      text: `<b>Nome:</b>${req.body.nome}<br>
             <b>Sobrenome:</b>${req.body.sobrenome}<br>
             <b>Email:</b>${req.body.email}<br>
             <b>Telefone:</b>${req.body.telefone}<br>
             <b>Cidade:</b>${req.body.cidade}<br>
             <b>Tipo de Plano:</b>${req.body.tipo}<br>
             <b>Forma de Simulação:</b>${req.body.forma}`,
  
      html: `<style>*{font-family:arial,sans-serif}a{text-decoration:none;color:#000}th,td{padding:8px}span{font-weight:800;padding-right:5px}h4,p{text-align:center}.logo{padding-bottom:10px;border-bottom:solid 4px #d3ae58}</style>
              <div class="logo">
              <img src="https://www.hpcap.com.br/logo${req.body.imagem}.svg" alt="Logo da HP Capital" width="100">
              </div>
              <div>
              <h2>Menssagem do site ${req.body.empresa}</h2>
              <table>
              <tr>
              <td><span>Nome:</span>${req.body.nome}</td>
              </tr>
              <tr>
              <td><span>Sobrenome:</span>${req.body.sobrenome}</td>
              </tr>
              <tr>
              <td><span>E-mail:</span>${req.body.email}</td>
              </tr>
              <tr>
              <td><span>Telefone:</span>${req.body.telefone}</td>
              </tr>
              <tr>
              <td><span>Cidade:</span>${req.body.cidade}</td>
              </tr>
              <tr>
              <td><span>Tipo de Plano:</span>${req.body.tipo}</td>
              </tr>
              <tr>
              <td><span>Forma de Simulação:</span>${req.body.forma}</td>
              </tr>
              </table>
              </div>
              <div>
              <p>Em breve, voltaremos com mais informativos do site.</p>
              <h4><a href="${req.body.site}">HP Capital</a></h4>
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

app.listen(8080, (req, res) => console.log(`SERVIDOR EM FUNCIONAMENTO`))