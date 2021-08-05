const { celebrate, Joi } = require('celebrate');
const Card = require('../models/card');
const NoAuth = require('../errors/no-auth');
const BadRequest = require('../errors/bad-request');
const NotFound = require('../errors/not-found');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new BadRequest('Ошибка валидации');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { ownerId } = req.user._id;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFound('Карточка по данному id не найдена');
    })
    .then((card) => {
      if (!card) {
        throw new BadRequest('Неверные данные');
      }
      if (ownerId === card.owner._id) {
        Card.deleteOne(card).then(() => {
          res.send({ data: card });
        });
      } else {
        throw new NoAuth('Недостаточно прав');
      }
    })
    .catch(next);
};

module.exports.setLike = (req, res, next) => {
  const id = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFound('Карточка по данному id не найдена');
    })
    .then((card) => {
      if (!card) {
        throw new BadRequest('Неверные данные');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.removeLike = (req, res, next) => {
  const id = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: id } }, { new: true })
    .orFail(() => {
      throw new NotFound('Карточка по данному id не найдена');
    })
    .then((card) => {
      if (!card) {
        throw new BadRequest('Неверные данные');
      }
      res.send({ data: card });
    })
    .catch(next);
};
