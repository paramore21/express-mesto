const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 400) {
        res.status(err.statusCode).send({ message: err.message });
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error('Пользователь по указанному id не найден');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Произошла ошибка' });
      } else if (err.statusCode === 404) {
        res.status(err.statusCode).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('Неверные данные');
      error.statusCode = 400;
      throw error;
    })
    .then((user) => { res.send({ data: user }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Произошла ошибка' });
      } else if (err.statusCode === 404) {
        res.status(err.statusCode).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('Неверные данные');
      error.statusCode = 400;
      throw error;
    })
    .then((data) => { res.send({ data }); })
    .catch((err) => {
      if (err.statusCode === 400) {
        res.status(err.statusCode).send({ message: err.message });
      }
      res.status(500).send({ message: err.message });
    });
};
