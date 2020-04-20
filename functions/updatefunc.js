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
        if(!doc) cb(`${err}`);

            else cb(null,'User information updated.');
        });   
   }
catch(err){
    cb(`${err}`);
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
            if(!doc) cb(`${err}`);
    
                else cb(null,'Home information updated.');
            });   
    }
    catch(err){
        cb(`${err}`);
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
            if(!doc) cb(`${err}`);
    
                else cb(null,'Landlord information updated.');
            });   
    }
    catch(err){
        cb(`${err}`);
    }

}


exports.updateUser=updateUser;
exports.updateHome=updateHome;
exports.updateLandlord=updateLandlord;