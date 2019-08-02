const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));

// enable CORS
app.use(cors());
app.options('*', cors());

// Configure Mongoose
mongoose.connect('mongodb://localhost/yapper');
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