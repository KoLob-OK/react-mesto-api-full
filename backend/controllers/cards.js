const Card = require('../models/card');

const { ErrorHandler } = require('../errors/handleError');

const statusCode = {
  ok: 200,
  created: 201,
};

// GET /cards - получение всех карточек
const getAllCards = async (req, res, next) => {
  console.log('getAllCards');
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    res.status(statusCode.ok).send(cards.reverse());
    console.log('Карточки загружены');
  } catch (err) {
    next(err);
  }
};

// POST /cards - создание карточки
const createCard = async (req, res, next) => {
  console.log('createCard');
  const { name, link } = req.body;
  try {
    const ownerId = req.user._id;
    const card = await Card.create({ name, link, owner: ownerId });
    await card.populate('owner');
    console.log(card);
    res.status(statusCode.created).send(card);
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      next(new ErrorHandler(400, 'Ошибка 400. Переданы некорректные данные при создании карточки'));
    }
    next(err);
  }
};

// DELETE /cards/:cardId - удаление карточки
const deleteCard = async (req, res, next) => {
  console.log('deleteCard');
  try {
    const { cardId } = req.params;
    const userId = req.user._id;
    const card = await Card
      .findById(cardId)
      .orFail(new ErrorHandler(404, 'Ошибка 404. Карточка не найдена'))
      .populate('owner');
    const ownerId = card.owner._id.toString();
    if (ownerId !== userId) {
      next(new ErrorHandler(403, 'Ошибка 403. Удаление чужой карточки запрещено'));
      return;
    }
    await Card.findByIdAndRemove(cardId);
    res.status(statusCode.ok).send(card);
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      next(new ErrorHandler(400, 'Ошибка 400. Переданы некорректные данные при удалении карточки'));
    }
    next(err);
  }
};

// PUT /cards/:cardId/likes - лайк карточки
const likeCard = async (req, res, next) => {
  console.log('likeCard');
  const { cardId } = req.params;
  const ownerId = req.user._id;
  try {
    const card = await Card
      .findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: ownerId } }, // добавить _id в массив, если его там нет
        { new: true },
      )
      .orFail(new ErrorHandler(404, 'Ошибка 404. Карточка не найдена'))
      .populate(['owner', 'likes']);
    res.status(statusCode.ok).send(card);
  } catch (err) {
    next(err);
  }
};

// DELETE /cards/:cardId/likes - удаление лайка карточки
const deleteLike = async (req, res, next) => {
  console.log('deleteLike');
  try {
    const { cardId } = req.params;
    const ownerId = req.user._id;
    const card = await Card
      .findByIdAndUpdate(
        cardId,
        { $pull: { likes: ownerId } }, // убрать _id из массива
        { new: true },
      )
      .orFail(new ErrorHandler(404, 'Ошибка 404. Карточка не найдена'))
      .populate(['owner', 'likes']);
    res.status(statusCode.ok).send(card);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLike,
};
