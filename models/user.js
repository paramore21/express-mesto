const { isEmail, isURL } = require('validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

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
      // validator(url) {
      //   return /^https?:\/\/(www\.)?[\w&-\/\!\$\\:\[\]\@\?\~\#\;\=]+#?$/gm.test(url);
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

userSchema.statics.findUserByCredentials = function(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неверная почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неверная почта или пароль'));
          }
          return user._id;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
