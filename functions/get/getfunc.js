const users=require('../../schema/user');
const myError=require('../../error');

//Get all users
function getAllUsers(db,cb){
        db.collection('users').find({}).toArray(function(err, docs) {
             try{
            if(err){
                myError.Error(db,'user',200,4,(error,pls)=>{
                    if(error) cb(error);
                    else cb(pls);
                  });
            }
             
           else cb(null,docs); 
             } 
           catch(err){
            myError.Error(db,'get',500,2,(error,pls)=>{
          if(error) cb(error);
          else cb(pls);
        });
        }
        });     
}

//Get specific user
function getSpecificUser(db,id,o_id,cb){
    try{ 
        db.collection('users').findOne({'_id': o_id},(err,doc) =>{
        if(!doc){
            myError.Error(db,'user',200,4,(error,pls)=>{
                if(error) cb(error);
                else cb(pls);
              });
        }

            else cb(null,doc);
        });    
    }
     catch(err){
        myError.Error(db,'get',500,2,(error,pls)=>{
            if(error) cb(error);
            else cb(pls);
          });
    }
}

//Get all landlords
function getAllLandlords(db,cb){
    try{ 
        db.collection('landlords').find({}).toArray(function(err, docs) {
             if(err){
                myError.Error(db,'landlord',200,4,(error,pls)=>{
                    if(error) cb(error);
                    else cb(pls);
                  });
             } 
            
             else cb(null, docs);
        });     
    } 
    catch(err){
        myError.Error(db,'get',500,2,(error,pls)=>{
            if(error) cb(error);
            else cb(pls);
          });
    }
}

//Get Specific Landlord
function getSpecificLandlord(db,id,o_id,cb){
    try{ 
        db.collection('landlords').findOne({'_id': o_id},(err,doc) =>{
        if(!doc) {
            myError.Error(db,'landlord',200,4,(error,pls)=>{
                if(error) cb(error);
                else cb(pls);
              });
        }

            else cb(null, doc);
        });    
    }
     catch(err){
        myError.Error(db,'get',500,2,(error,pls)=>{
            if(error) cb(error);
            else cb(pls);
          });
    }
}


exports.getAllUsers=getAllUsers;
exports.getSpecificUser=getSpecificUser;
exports.getAllLandlords=getAllLandlords;
exports.getSpecificLandlord=getSpecificLandlord;
