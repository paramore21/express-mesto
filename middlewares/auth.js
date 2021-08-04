const NoAuth = require('../errors/no-auth')
const jwt = require('jsonwebtoken');


const { JWT_SECRET = 'DEFAULT_JWT_SECRET' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new NoAuth('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    const err = new Error('Необходима авторизация'); 
    err.statusCode = 401;

    next(err);
  }
  req.user = payload;
  next();
};
