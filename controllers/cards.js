const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch(() => { res.status(500).send({ message: 'Ошибка!' }); });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(() => { res.status(500).send({ message: 'Ошибка!' }); });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      const error = new Error('Карточка по данному id не найдена');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      Card.deleteOne(card)
        .then(() => { res.send({ data: card }); });
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(err.statusCode).send({ message: err.message });
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.setLike = (req, res) => {
  const id = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: id } }, { new: true })
    .orFail(() => {
      const error = new Error('Неверные данные');
      error.statusCode = 400;
      throw error;
    })
    .then((card) => { res.send({ data: card }); })
    .catch((err) => {
      if (err.statusCode === 400) {
        res.status(err.statusCode).send({ message: err.message });
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.removeLike = (req, res) => {
  const id = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: id } }, { new: true })
    .orFail(() => {
      const error = new Error('Неверные данные');
      error.statusCode = 400;
      throw error;
    })
    .then((card) => { res.send({ data: card }); })
    .catch((err) => {
      if (err.statusCode === 400) {
        res.status(err.statusCode).send({ message: err.message });
      }
      res.status(500).send({ message: err.message });
    });
};
