const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { ErrorHandler } = require('../errors/handleError');

const { NODE_ENV, JWT_SECRET } = process.env;
console.log(process.env.NODE_ENV);

const statusCode = {
  ok: 200,
  created: 201,
};

// POST /signup - создание пользователя (email*, password*)
const createUser = async (req, res, next) => {
  console.log('createUser');
  try {
    const {
      email, password, name, about, avatar,
    } = req.body;
    const passHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: passHash,
      name,
      about,
      avatar,
    });
    res.status(statusCode.created).send({
      _id: user._id,
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });
    // next();
  } catch (err) {
    if (err.code === 11000) {
      next(new ErrorHandler(409, `Ошибка 409. Пользователь ${req.body.email} уже существует`));
    }
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      next(new ErrorHandler(400, 'Ошибка 400. Неверные данные'));
    }
    next(err);
  }
};

// POST /signin - аутентификация пользователя (email*, password*)
const login = async (req, res, next) => {
  console.log('login');
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);

    // если найден, создаем токен
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
      { expiresIn: '7d' },
    );

    // вернём токен, браузер сохранит его в куках
    res
    // КУКИ ПРОВАЛИВАЮТ ТЕСТЫ НА ГИТХАБЕ!!!
    /* .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }) */
      .send({ token, message: 'Успешный вход' });
    console.log(token);
  } catch (err) {
    next(err);
  }
};

// GET /users/me - получение инфо о текущем пользователе
const getCurrentUser = async (req, res, next) => {
  console.log('getCurrentUser');
  const { _id } = req.user;
  console.log({ _id });
  try {
    const user = await User.findById(_id);
    if (!user) {
      next(new ErrorHandler(404, 'Ошибка 404. Пользователь не найден'));
    }
    res.status(statusCode.ok).send(user);
    console.log('Текущий пользователь загружен');
  } catch (err) {
    next(err);
  }
};

// GET /users - получение всех пользователей
const getAllUsers = async (req, res, next) => {
  console.log('getAllUsers');
  try {
    const users = await User.find({});
    res.status(statusCode.ok).send(users);
  } catch (err) {
    next(err);
  }
};

// GET /users/:userId - получение пользователя по id
const getUser = async (req, res, next) => {
  console.log('getUser');
  const { userId } = req.params;
  console.log({ userId });
  try {
    const user = await User.findById(userId);
    if (!user) {
      next(new ErrorHandler(404, 'Ошибка 404. Пользователь не найден'));
    }
    res.status(statusCode.ok).send(user);
  } catch (err) {
    next(err);
  }
};

// PATCH /users/me - обновление данных пользователя
const updateUser = async (req, res, next) => {
  console.log('updateUser');
  const { name, about } = req.body;
  const ownerId = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      ownerId,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      next(new ErrorHandler(404, 'Ошибка 404. Пользователь не найден'));
    }
    res.status(statusCode.ok).send(user);
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      next(new ErrorHandler(400, 'Ошибка 400. Неверные данные'));
    }
    next(err);
  }
};

// PATCH /users/me/avatar - обновление аватара пользователя
const updateAvatar = async (req, res, next) => {
  console.log('updateAvatar');
  const { avatar } = req.body;
  const ownerId = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      ownerId,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      next(new ErrorHandler(404, 'Ошибка 404. Пользователь не найден'));
    }
    res.status(statusCode.ok).send(user);
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      next(new ErrorHandler(400, 'Ошибка 400. Неверные данные'));
    }
    next(err);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  getCurrentUser,
  createUser,
  login,
  updateUser,
  updateAvatar,
};
