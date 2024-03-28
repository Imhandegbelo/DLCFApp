const passport = require("passport");
const mongoose = require("mongoose");
// import Users from '../models/Users'

// eslint-disable-next-line
const Users = require("../models/users");


var User = mongoose.model("Users");

const CreateUser = (req, res) => {
  const { user } = req.body;
  if (!user.username) {
    return res.status(422).json({
      errors: {
        username: "is required",
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required",
      },
    });
  }

  const finalUser = new User(user);

  finalUser.setPassword(user.password);
  return finalUser
    .save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }))
    .catch((err) => {
      return res.status(422).json({
        err: err,
        message: "Username already in use",
      });
    });
};

//POST login route (optional, everyone has access)
const Login = (req, res) => {
  const { user } = req.body;
  if (!user.username) {
    return res.status(422).json({
      err: "Username is required",
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: "Password is required",
    });
  }

  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
      }
      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();

        return res.json({ user: user.toAuthJSON() });
      }
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
  )(req, res);
};

module.exports = { CreateUser, Login };
