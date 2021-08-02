require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(errors());

const { login, createUser } = require('./controllers/users');

app.post('/signin', login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
  name: Joi.string().required().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: 
})}, createUser);

app.use(auth);

app.use('/', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
