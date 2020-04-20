const myError=require('../error');
const users=require('../schema/user');
const { v4: uuidv4 } = require('uuid');
const nodemailer=require('nodemailer');

function verifyEmail(db,uuid,cb){
    db.collection('users').findOne({ emailCode: uuid}, (err,user2)=>{
        if(err) {
            var error=new myError('We were unable to find a user for this code.','400');
                cb([error.message, ' status: ', error.statusCode]);
        }
        
        user2.status='active';
        db.collection('users').updateOne({'_id': user2._id},{$set: user2},(err,doc) =>{
            if(!doc) {
                var error=new myError('Something went wrong...','500');
                cb([error.message, ' status: ', error.statusCode]);
            }
    
                else cb(null,'The account has been verified.');
            });   
    });
}

exports.verifyEmail=verifyEmail;