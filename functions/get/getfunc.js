const users=require('../../schema/user');

//Get all users
function getAllUsers(db,cb){
        db.collection('users').find({}).toArray(function(err, docs) {
             try{
            if(err) cb(`${err}`);
             
           else cb(null,docs); 
             } 
           catch(err){
            cb({message: `${err}`});
            }
        });     
}

//Get specific user
function getSpecificUser(db,id,o_id,cb){
    try{ 
        db.collection('users').findOne({'_id': o_id},(err,doc) =>{
        if(!doc) cb(`${err}`);

            else cb(null,doc);
        });    
    }
     catch(err){
        cb({message: `${err}`});
    }
}

//Get all landlords
function getAllLandlords(db,cb){
    try{ 
        db.collection('landlords').find({}).toArray(function(err, docs) {
             if(err) cb(`${err}`);
            
             else cb(null, docs);
        });     
    } 
    catch(err){
        cb(`${err}`);
    }
}

//Get Specific Landlord
function getSpecificLandlord(db,id,o_id,cb){
    try{ 
        db.collection('landlords').findOne({'_id': o_id},(err,doc) =>{
        if(!doc) 
        cb(`${err}`);

            else cb(null, doc);
        });    
    }
     catch(err){
        cb(`${err}`);
    }
}


exports.getAllUsers=getAllUsers;
exports.getSpecificUser=getSpecificUser;
exports.getAllLandlords=getAllLandlords;
exports.getSpecificLandlord=getSpecificLandlord;
