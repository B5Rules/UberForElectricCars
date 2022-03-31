const { Schema, model } = require('mongoose');

const invitesSchema = new Schema({
  code: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'patient', 'doctor'],
  },
  used: {
    type: Boolean,
    required: true,
    default: false,
  },
  linkedToEmail: {
    type: String,
    required: true,
  },
  activeUntil: {
    type: Number,
    required: true,
  },
}, { collection: 'inviteCodes' });

invitesSchema.index({ linkedToEmail: 1, used: 1 }, { unique: true });

module.exports = model('inviteCodes', invitesSchema);
