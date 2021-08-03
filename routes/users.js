const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUsers, createUser, getUser, updateUser, updateAvatar } = require('../controllers/users');

router.get('/users', getUsers);

router.post('/users', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).max(30),
  }),
}), createUser);

router.get('/users/me', getUser);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateAvatar);
module.exports = router;
