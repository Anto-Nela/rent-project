const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    token: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'inactive',
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    endDate: {
        type: Date
      },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  });
  
  // export model user with UserSchema
  module.exports = mongoose.model('tokens', tokenSchema);