require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000, JWT_SECRET } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '60f5c2c6085bed1d2473658e',
  };

  next();
});

app.use('/', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
