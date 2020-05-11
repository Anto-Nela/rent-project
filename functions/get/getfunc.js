const users=require('../../schema/user');
const myError=require('../../error');

//Get all users
function getAllUsers(db,cb){
        db.collection('users').find({}).toArray(function(err, docs) {
             try{
            if(err){
                var error=new myError('No users found!','404');
                cb([error.message, ' status: ', error.statusCode]);
            }
             
           else cb(null,docs); 
             } 
           catch(err){
            var error=new myError('An error occurred in searching for the users','500');
                cb([error.message, ' status: ', error.statusCode]);
            }
        });     
}

//Get specific user
function getSpecificUser(db,id,o_id,cb){
    try{ 
        db.collection('users').findOne({'_id': o_id},(err,doc) =>{
        if(!doc){
        var error=new myError('No user with that id found!','404');
        cb([error.message, ' status: ', error.statusCode]);
        }

            else cb(null,doc);
        });    
    }
     catch(err){
        var error=new myError('No user with that id found!','404');
        cb([error.message, ' status: ', error.statusCode]);
    }
}

//Get all landlords
function getAllLandlords(db,cb){
    try{ 
        db.collection('landlords').find({}).toArray(function(err, docs) {
             if(err){
                var error=new myError('No landlords found!','404');
                cb([error.message, ' status: ', error.statusCode]);
             } 
            
             else cb(null, docs);
        });     
    } 
    catch(err){
        var error=new myError('An error occurred in searching for the landlords','500');
        cb([error.message, ' status: ', error.statusCode]);
    }
}

//Get Specific Landlord
function getSpecificLandlord(db,id,o_id,cb){
    try{ 
        db.collection('landlords').findOne({'_id': o_id},(err,doc) =>{
        if(!doc) {
         var error=new myError('No landlord with that id found!','404');
        cb([error.message, ' status: ', error.statusCode]);
        }

            else cb(null, doc);
        });    
    }
     catch(err){
        var error=new myError('No landlord with that id found!','404');
        cb([error.message, ' status: ', error.statusCode]);
    }
}


exports.getAllUsers=getAllUsers;
exports.getSpecificUser=getSpecificUser;
exports.getAllLandlords=getAllLandlords;
exports.getSpecificLandlord=getSpecificLandlord;
