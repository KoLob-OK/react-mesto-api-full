require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { celebrate, errors, Joi } = require('celebrate');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { regexUrl, limiterConfig } = require('./utils/constants');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { ErrorHandler, handleError } = require('./errors/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

const limiter = rateLimit(limiterConfig);

app.use(express.json());
app.use(cors());
app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);
app.use(helmet());

// Краш-тест сервера (запрос вызывает падение сервера для проверки его автоматического восстановления)
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роуты, не требующие авторизации (регистрация и логин)
app.post('/signin', celebrate({
  // валидируем тело запроса
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  // валидируем тело запроса
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexUrl),
  }),
}), createUser);
// роуты, которым авторизация нужна
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// запрос к ошибочному роуту
app.use('*', (req, res, next) => {
  next(new ErrorHandler(404, 'Ошибка 404. Введен некорректный адрес'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch(() => {
    console.log('Database connection error');
  });

app.use(handleError);

app.listen(PORT, () => {
  console.log(`App  listening on port ${PORT}`);
});
