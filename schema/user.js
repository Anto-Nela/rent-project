const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    confirmpass: {
      type: String,
      required: true
    },
    username: {
        type: String,
        required: true
      },
    birthday: {
        type: String,
        required: true
      },
    gender: {
        type: String,
        required: true
      },
    status:{
        type:String,
        default:'inactive'
      },
    emailCode:{
      type: String
     }
  });
  
  // export model user with UserSchema
  module.exports = mongoose.model('users', userSchema);