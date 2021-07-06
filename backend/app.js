require('dotenv').config()
const express = require('express');

const userRoute = require("./routes/user");
const articleRoute = require("./routes/article");

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api/auth", userRoute);
app.use("/api/auth", articleRoute);


module.exports = app;