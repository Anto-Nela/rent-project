const mongodb = require('mongodb');
const jwt= require('jsonwebtoken');
const myError=require('../error');
const Tokens=require('../schema/tokens');

function checkActive(db,req,res,next){
    try{
        const token=req.headers.authorization.split(' ')[1];
        var date=Date.now();

        if (!token) {
            var error=new myError('No token provided.','401');
            return res.status(401).json([error.message,' status: ', error.statusCode]);
        }
    
        db.collection('Tokens').findOne({ token: token}, (err,tokeni1)=>{
            if(err) return res.status(500).json(`Something happend... ${err}`);

        if(tokeni1.status==='inactive'){
            var error=new myError('You have been logged out, please log in again.','404');
            return res.status(404).json([error.message,' status: ', error.statusCode]);
        }

        else {
            next();
        }
    });
}
catch(error){
    return res.json(`${error}`);
}
}

exports.checkActive=checkActive;