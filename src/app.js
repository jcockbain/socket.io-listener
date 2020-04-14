require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const socketIOClient = require('socket.io-client');

const socket = socketIOClient('http://localhost:10000');

const routes = require('./routes');

const port = process.env.PORT || 6000;

const middleware = require('./middleware');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/', routes);

app.use(middleware.errorHandler.handleErrors);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

socket.on('connect', () => {
  console.log('connected');
});

socket.on('event', (data) => {
  console.log(data);
});

socket.on('disconnect', () => {
  console.log('disconnect');
});


module.exports = app;
