const mongoose = require('mongoose');

const imageSchema= mongoose.Schema({ 
    img: { 
        data: Buffer, 
        contentType: String 
        }
    });

module.exports = mongoose.model('imagetester', imageSchema);