const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'DEFAULT_JWT_SECRET' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({
      message: 'Вы не авторизованы',
    });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    next(res.status(401).send({
      message: 'Вы не авторизованы',
    }));
  }
  req.user = payload;
  next();
};
