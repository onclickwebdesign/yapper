const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

require('./config/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

// Configure Mongoose
mongoose.connect('mongodb://localhost/yapper', { useNewUrlParser: true}).then(
  () => console.log('MongoDB Connected..')
).catch(err => console.error(err));

mongoose.set('debug', true);

// Import Mongoose Models
require('./models/User');
require('./models/Yip');
require('./models/YipBack');
require('./models/Reply');

// setup routes
app.use(require('./routes/profile'));
app.use('/auth', require('./routes/auth'));

// 404 route
app.use((req, res, next) => {
  const err = new Error(`The requested URL ${req.originalUrl} was not found on this server.  That's all we know.`);
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).render('error', { err });
});

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});