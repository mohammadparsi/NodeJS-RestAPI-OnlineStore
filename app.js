const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const feedRoutes = require('./routes/feed');
const adminRoutes = require('./routes/admin');
const customerRoutes = require('./routes/customer');
const authRoutes = require('./routes/auth');

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// let express to use this (Add after body-parser)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

app.use('/feed', feedRoutes);
app.use('/admin', adminRoutes);
app.use('/customer', customerRoutes);
app.use('/auth', authRoutes);

mongoose.connect('mongodb://0.0.0.0:27017/shop')
.then(result => app.listen(8080))
.catch(err => console.log(err))
