const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getProfile,
} = require('../controllers/users');

router.get('/', getUsers);

router.patch('/me', updateUser);

router.get('/me', getProfile);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
