const { celebrate, Joi } = require('celebrate');
const { regexUrl } = require('../utils/constants');

const router = require('express').Router();

const {
  getAllUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    userId: Joi.string().hex().required().length(24),
  }),
}), getUser);

router.patch('/me', celebrate({
  // валидируем тело запроса
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  // валидируем тело запроса
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regexUrl),
  }),
}), updateAvatar);

module.exports = router;
