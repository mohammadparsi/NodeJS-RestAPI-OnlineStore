const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const feedRoutes = require('./routes/feed');
const adminRoutes = require('./routes/admin');
const customerRoutes = require('./routes/customer');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

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
app.use('/chat', chatRoutes);

mongoose.connect('mongodb://0.0.0.0:27017/shop')
  .then(result => {
    const server = app.listen(8080);
    const io = require('./socket').init(server);
    io.on('connection', (socket) => {
      console.log('client connected!');
      // socket.on('new message', data => {
      //   console.log(data);
      //   socket.emit('new message', {from: data.from, to: '634c068195d894398ce1a9d3', message: data.message});
      // });
    });

  })
  .catch(err => console.log(err))
