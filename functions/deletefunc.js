const users=require('../schema/user');

//Delete a User
function deleteUser(db,id,o_id,cb){
    try{ 
        db.collection('users').deleteOne({'_id': o_id},(err,doc) =>{
        if(!doc) {
            var error=new myError('No such user found to delete','404');
            cb([error.message, ' status: ', error.statusCode]);
        }

            else cb(null,'User deleted');
        });    
    }
     catch(err){
        var error=new myError('An error occurred while deleting the user','500');
        cb([error.message, ' status: ', error.statusCode]);
    }
}

//Delete a Home
function deleteHome(db,id,o_id,cb){
    try{ 
        db.collection('homes').deleteOne({'_id': o_id},(err,doc) =>{
            if(!doc) {
                var error=new myError('No such home found to delete','404');
                cb([error.message, ' status: ', error.statusCode]);
            }

            else cb(null,'Home deleted');
        });    
    }
     catch(err){
        var error=new myError('An error occurred while deleting the home','500');
        cb([error.message, ' status: ', error.statusCode]);
    }
}


//Delete a landlord
function deleteLandlord(db,id,o_id,cb){
    try{ 
        db.collection('landlords').deleteOne({'_id': o_id},(err,doc) =>{
            if(!doc){
                var error=new myError('No such landlord found to delete','404');
                cb([error.message, ' status: ', error.statusCode]);
            }

            else cb(null,'Landlord deleted');
        });    
    }
     catch(err){
        var error=new myError('An error occurred while deleting the landlord','500');
        cb([error.message, ' status: ', error.statusCode]);
    }
}



exports.deleteUser=deleteUser;
exports.deleteHome=deleteHome;
exports.deleteLandlord=deleteLandlord;