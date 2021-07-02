// J'utilise mysql2 parce que le nouveau systeme de connexion securise de mysql 8 n'est pas compatible avec node js
const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: 'forum'
});


dbConnection.connect(function(err) {
  if (err) throw err;
  console.log("Mysql connecté !");
});

module.exports = dbConnection;