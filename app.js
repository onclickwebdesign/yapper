const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

// Import Mongoose Models
require('./models');

require('./config/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('combined'));

// Express Session
app.use(session({
  secret: 'yapper secret',
  resave: true,
  saveUninitialized: true,
  //cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

// enable CORS
app.use(cors({credentials: true, origin: true}));
app.options('*', cors({credentials: true, origin: true}));

// serve up static assets
app.use('/static', express.static('public'));

// serve up static React app for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Configure Mongoose
const mongoURI = process.env.NODE_ENV === 'test' ? process.env.mongo_cluster_connection_test : process.env.mongo_cluster_connection;
mongoose.connect(mongoURI || 'mongodb://localhost/yapper', { useUnifiedTopology: true, useNewUrlParser: true }).then(
  () => console.log(`MongoDB connected for ${process.env.NODE_ENV}.`)
).catch(err => console.error(err));

// mongoose.set('debug', true);

// setup routes
app.use(require('./routes'));

// 404 route
app.use((req, res, next) => {
  const err = new Error(`The requested URL ${req.originalUrl} was not found on this server.  That's all we know.`);
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  err.status = err.status || 500;
  res.status(err.status).redirect(`${process.env.webUrl}?404=true`);
});

module.exports = { app, mongoose };
