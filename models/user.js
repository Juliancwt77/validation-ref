var mongoose = require('mongoose')
// var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Why no email?'],
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  password: String,
  firstname: {
    type: String,
    default: 'Jane'
  },
  lastname: {
    type: String,
    default: 'Doe'
  }
})

module.exports = mongoose.model('User', userSchema);
