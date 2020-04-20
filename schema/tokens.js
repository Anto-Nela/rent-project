const mongoose = require('mongoose');
var today = new Date();
today.setMinutes(today.getMinutes() + 15);

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
        type: Date,
        default: today
      },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  });
  
  // export model user with UserSchema
  module.exports = mongoose.model('tokens', tokenSchema);