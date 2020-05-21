const mongodb = require('mongodb');
const jwt= require('jsonwebtoken');
const myError=require('../error');
const Tokens=require('../schema/tokens');

function checkActive(db,req,res,next){
    try{
        const token=req.headers.authorization.split(' ')[1];
        var date=Date.now();

        if (!token) {
            myError.Error(db,'token',400,4,(error,pls)=>{
                if(error) res.json(error);
                else res.json(pls);
              });
        }
    
        db.collection('Tokens').findOne({ token: token}, (err,tokeni1)=>{
            if(err){
                myError.Error(db,'all',500,4,(error,pls)=>{
                    if(error) res.json(error);
                    else res.json(pls);
                  });
            }
            
        if(tokeni1.status==='inactive'){
            myError.Error(db,'token',500,11,(error,pls)=>{
                if(error) res.json(error);
                else res.json(pls);
              });
        }

        else {
            next();
        }
    });
}
catch(error){
    myError.Error(db,'all',500,4,(error,pls)=>{
        if(error) res.json(error);
        else res.json(pls);
      });
}
}

exports.checkActive=checkActive;