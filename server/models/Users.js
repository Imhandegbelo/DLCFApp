const mongoose = require("mongoose");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// const { Schema } = mongoose;

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  hash: String,
  salt: String,
});

UsersSchema.methods.setPassword = function(password) {
  console.log(password)
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
  console.log(password)
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    username: this.username,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UsersSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    username: this.username,
    token: this.generateJWT(),
  };
};

module.exports = mongoose.model('Users', UsersSchema);