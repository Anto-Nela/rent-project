const users=require('../schema/user');

//Delete a User
function deleteUser(db,id,o_id,cb){
    try{ 
        db.collection('users').deleteOne({'_id': o_id},(err,doc) =>{
        if(!doc) cb(`${err}`);

            else cb(null,'User deleted');
        });    
    }
     catch(err){
        cb(`${err}`);
    }
}

//Delete a Home
function deleteHome(db,id,o_id,cb){
    try{ 
        db.collection('homes').deleteOne({'_id': o_id},(err,doc) =>{
            if(!doc) cb(`${err}`);

            else cb(null,'Home deleted');
        });    
    }
     catch(err){
        cb(`${err}`);
    }
}


//Delete a landlord
function deleteLandlord(db,id,o_id,cb){
    try{ 
        db.collection('landlords').deleteOne({'_id': o_id},(err,doc) =>{
            if(!doc) cb(`${err}`);

            else cb(null,'Landlord deleted');
        });    
    }
     catch(err){
        res.status(404).json( `${err}`);
    }
}



exports.deleteUser=deleteUser;
exports.deleteHome=deleteHome;
exports.deleteLandlord=deleteLandlord;