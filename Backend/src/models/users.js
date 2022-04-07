const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  firebaseUID: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Number,
    required: true,
    default: new Date(),
  },
}, { collection: 'users' });

userSchema.index({ username: 1, email: 1 }, { unique: true });

module.exports = model('users', userSchema);
