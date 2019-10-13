const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// Import Mongoose Models
require('./models');

require('./config/passport')(passport);

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
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
mongoose.connect(process.env.mongo_cluster_connection || 'mongodb://localhost/yapper', { useNewUrlParser: true}).then(
  () => console.log('MongoDB Connected..')
).catch(err => console.error(err));

mongoose.set('debug', true);

// setup routes
app.use(require('./routes'));

// 404 route
app.use((req, res, next) => {
  const err = new Error(`The requested URL ${req.originalUrl} was not found on this server.  That's all we know.`);
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).redirect(`${process.env.webUrl}?404=true`);
});

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});