require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const AuthentificationError = require('../errors/authentification-err');
const ValidationError = require('../errors/validation-err');
const DuplicateError = require('../errors/duplicate-err');

const { JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .cookie('jwt',
          token,
          {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          })
        .send(user);
    })
    .catch(() => {
      next(new AuthentificationError('Неправильный адрес почты или пароль'));
    });
};

module.exports.getUsers = (req, res, next) => User
  .find({})
  .then((users) => res.status(200).send({ users }))
  .catch(next);

module.exports.getUserById = (req, res, next) => User
  .findById(req.params.userId)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    }
    res.status(200).send(user);
  })
  .catch(next);

module.exports.getProfile = (req, res, next) => User
  .findOne({ _id: req.user._id })
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    }
    res.status(200).send(user);
  })
  .catch(next);

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(200).send({
      _id: user._id,
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные в методы создания пользователя');
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new DuplicateError('Пользователь с указанным email уже существует');
      }
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные в методы редактирования пользователя');
      }
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные в методы редактирования аватара');
      }
    })
    .catch(next);
};
