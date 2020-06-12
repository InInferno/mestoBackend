const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(cardLink) {
        return validator.isURL(cardLink, { protocol: ['http', 'https'], require_protocol: true });
      },
      message: (props) => `Введённый Вами URL-адрес: ${props.value} некорректен`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    requred: true,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
