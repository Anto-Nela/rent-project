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
        myError.Error(db,'token',400,4,(error,pls)=>{
            if(error) cb(error);
            else cb(pls);
          });
    }
        
   db.collection('Tokens').findOne({ token: token}, (err,tokeni1)=>{
        if(err) {
            myError.Error(db,'token',400,4,(error,pls)=>{
                if(error) cb(error);
                else cb(pls);
              });
        }
        
        if(tokeni1.status==='active' ){
            tokeni1.status='inactive';
            tokeni1.endDate=date;

             db.collection('Tokens').updateOne({token: token},{$set: tokeni1},(err,doc) =>{
                    if(!doc) {
                        myError.Error(db,'token',400,4,(error,pls)=>{
                            if(error) cb(error);
                            else cb(pls);
                          });
                    }
                        else cb(null, {message: 'You have been logged out'});
                    });   
        }
        else {
            cb(null, {message: 'You have already been logged out'});
        }
    });
    
} catch(error){
    myError.Error(db,'logout',500,3,(error,pls)=>{
        if(error) cb(error);
        else cb(pls);
      });
}
}


exports.logoutUser=logoutUser;