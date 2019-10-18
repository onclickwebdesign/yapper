const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
      User.findOne({ email }).then(user => {
        // Match password
        if (!user || !user.validatePassword(password)) {
          return done(null, false, { message: 'Email or password is incorrect' });
        } else {
          return done(null, user);
        }
      }).catch(err => console.error(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};