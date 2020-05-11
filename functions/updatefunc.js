const users=require('../schema/user');

//Update user info
function updateUser(db,req,id,o_id,cb){
var upduser={
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    contact: req.body.contact
}
try{
     db.collection('users').updateOne({'_id': o_id},{$set: upduser},(err,doc) =>{
        if(!doc){
            var error=new myError('No information to update','404');
            cb([error.message, ' status: ', error.statusCode]);
        } 

            else cb(null,'User information updated.');
        });   
   }
catch(err){
    var error=new myError('An error occurred while updating user information','500');
    cb([error.message, ' status: ', error.statusCode]);
}
}

//Update home info
function updateHome(db,req,id,o_id,cb){
    let updhome={
        img: req.body.img,
        description: req.body.description,
        cmimi: req.body.cmimi,
        renting: req.body.renting,
    }

    try{
        db.collection('homes').updateOne({'_id': o_id},{$set: updhome},(err,doc) =>{
            if(!doc) {
                var error=new myError('No information to update','404');
                cb([error.message, ' status: ', error.statusCode]);
            }
    
                else cb(null,'Home information updated.');
            });   
    }
    catch(err){
        var error=new myError('An error occurred while updating the home information','500');
        cb([error.message, ' status: ', error.statusCode]);
    }
}

//Update landlord info
function updateLandlord(db,req,id,o_id,cb){
    let updlandlord={
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    owned: req.body.owned
    }

    try{
        db.collection('landlords').updateOne({'_id': o_id},{$set: updlandlord},(err,doc) =>{
            if(!doc) {
                var error=new myError('No information to update','404');
                cb([error.message, ' status: ', error.statusCode]);
            }
    
                else cb(null,'Landlord information updated.');
            });   
    }
    catch(err){
        var error=new myError('An error occurred while updating the landlord information','500');
        cb([error.message, ' status: ', error.statusCode]);
    }

}


exports.updateUser=updateUser;
exports.updateHome=updateHome;
exports.updateLandlord=updateLandlord;