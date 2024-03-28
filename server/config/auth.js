// const jwt = require('express-jwt');
const {expressjwt: expressJwt} = require('express-jwt')

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if(authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

const auth = {
  required: expressJwt({
    secret: 'secret',
    algorithms: ["HS256"],
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: expressJwt({
    secret: 'secret',
    algorithms: ["HS256"],
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;