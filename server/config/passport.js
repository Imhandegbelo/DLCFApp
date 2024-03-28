const { model } = require ('mongoose');
const { use } = require ('passport');
const LocalStrategy = require('passport-local');

const Users = model('Users');

use(new LocalStrategy({
  usernameField: 'user[username]',
  passwordField: 'user[password]',
}, (username, password, done) => {
  Users.findOne({ username })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'username or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));

// passport.use(new LocalStrategy(function verify(username, password, cb) {
//   // ...
// });