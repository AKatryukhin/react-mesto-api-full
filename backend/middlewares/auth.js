const jwt = require('jsonwebtoken');
const { AuthentificationError } = require('../errors/authentification-err');
const {
  JWT_SECRET,
} = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthentificationError('Передан неверный логин или пароль'));
  }
  req.user = payload;
  next();
};
