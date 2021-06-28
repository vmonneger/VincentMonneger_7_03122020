require('dotenv').config()
const express = require('express');
// J'utilise mysql2 parce que le nouveau systeme de connexion securise de mysql 8 n'est pas compatible avec node js
const mysql = require('mysql2');

const userRoute = require("./routes/user");

const app = express();

const connection = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("Mysql connecté !");
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api/auth", userRoute);


module.exports = app;