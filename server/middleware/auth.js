var jwt = require('express-jwt');

function getTokenFromHeader(req) {
  if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
}

var auth = {
  required: jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'user',
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'user',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

module.exports = auth;
