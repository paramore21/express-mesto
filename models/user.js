const { isEmail, isURL } = require('validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const BadRequest = require('../errors/bad-request');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => isURL(v),
      message: 'Неверный формат ссылки',
      // правильно ли валидировать url таким образом? Закомментировала, потому что не уверена
      // по идее \w реагирует и на пробелы, то есть если в ссылке будет пробел, то такая регулярка будет считать url корректным
      // validator(url) {
      //   return /^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([\\/\w \\.-]*)*\/?$/;
      // },
    },
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Пользователь с данным email не найден.'],
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неверный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
