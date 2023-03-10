const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const { regexUrl } = require('../utils/constants');

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLike,
} = require('../controllers/cards');

router.get('/', getAllCards);

router.post('/', celebrate({
  // валидируем тело запроса
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regexUrl),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
}), deleteLike);

module.exports = router;
