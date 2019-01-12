const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');


const server = http.createServer(express);
const io = require('socket.io')(server);

const port = 8000;
// Socket io
io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('change color', (color) => {
    console.log('Color Changed to: ', color);
    io.sockets.emit('change color', color);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
// Database

// const monk = require('monk');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}`,
  {
    dbName: config.db.dbName,
    useNewUrlParser: true,
    user: config.db.username,
    pass: config.db.password,
  },
  (err) => {
    if (err) {
      console.warn(err);
    } else {
      console.log('Database connected');
    }
  });

const routes = require('./routes');
// const Rental = require('./routes/rental');

const app = express();
app.use(cors());
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(bodyParser.json({ limit: '1gb' }));
app.use(bodyParser.urlencoded({ limit: '1gb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


global.io = io;

// app.use('/api/rental', Rental);
app.use('/api', routes);
app.use(express.static('build'));


// catch 404 and forwarding to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.send(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
