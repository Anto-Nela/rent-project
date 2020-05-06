const jwt= require('jsonwebtoken');
const myError=require('../error');
const Tokens=require('../schema/tokens');
const users=require('../schema/user');
const { v4: uuidv4 } = require('uuid');

//Logout user
function logoutUser(db,req,cb){
    const date=Date.now();
    try{
    const token=req.headers.authorization.split(' ')[1];
    
    if (!token) {
        var error=new myError('No token provided.','401');
        cb([error.message,' status: ', error.statusCode]);
    }
        
   db.collection('Tokens').findOne({ token: token}, (err,tokeni1)=>{
        if(err) cb(`The token does not exist. ${err}`);
        
        if(tokeni1.status==='active' ){
            tokeni1.status='inactive';
            tokeni1.endDate=date;

             db.collection('Tokens').updateOne({token: token},{$set: tokeni1},(err,doc) =>{
                    if(!doc) {
                        var error=new myError(`${err}`,'404');
                        cb([error.message,' status: ', error.statusCode]);
                    }
                        else cb(null, {message: 'You have been logged out'});
                    });   
        }
        else {
            cb(null, {message: 'You have already been logged out'});
        }
    });
    
} catch(error){
    var error=new myError(`Logout failed.${error}`,'500');
    cb([error.message,' status: ', error.statusCode]);
}
}


exports.logoutUser=logoutUser;