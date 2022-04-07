const { Schema, model } = require('mongoose');

const sessionSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
  },
  role: {
    type: String,
    required: true,
    lowercase: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
}, { collection: 'sessions' });

sessionSchema.index({ id: 1, username: 1, role: 1 }, { unique: true });

module.exports = model('sessions', sessionSchema);
