const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    requred: true,
    validate: {
      validator(userLink) {
        return validator.isURL(userLink, { protocol: ['http', 'https'], require_protocol: true });
      },
      message: (props) => `Введённый Вами URL-адрес: ${props.value} некорректен`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(userEmail) {
        return validator.isEmail(userEmail, { allow_utf8_local_part: false });
      },
      message: (props) => `Введённый Вами email: ${props.value} некорректен`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

userSchema.methods.hideHash = function hideHash() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('user', userSchema);
