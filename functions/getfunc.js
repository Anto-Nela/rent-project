const users=require('../schema/user');

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

//Get all homes
function getAllHomes(db,cb){
    try{ 
        db.collection('homes').find({}).toArray(function(err, docs) {
             if(err) cb(`${err}`);
            
            else cb(null, docs);
        });     

    } catch(err){
        cb(`${err}`);
    }
}


//Get Specific home
function getSpecificHome(db,id,o_id,cb){
    try{ 
        db.collection('homes').findOne({'_id': o_id},(err,doc) =>{
        if(!doc) cb(`${err}`);

        else cb(null, doc);
        });    
    }
     catch(err){
        cb(`${err}`);
    }
}


//get premiumHomes
function getPremiumHome(db, cb) {
    try {
      db.collection("homes")
        .find({ premium: true })
        .toArray(function (err, docs) {
          if (err) cb(`${err}`);
          else cb(null, docs);
        });
    } catch (err) {
      cb(`${err}`);
    }
  }
  
  //get normal home
  function getNormalHomes(db, cb) {
    try {
      db.collection("homes")
        .find({ premium: false })
        .toArray(function (err, docs) {
          if (err) cb(`${err}`);
          else cb(null, docs);
        });
    } catch (err) {
      cb(`${err}`);
    }
  }
  
  //Find by city
  function findByCity(db, place, cb) {
    try {
      db.collection("homes")
        .find({ "adress.qytet": place })
        .toArray(function (err, docs) {
          if (err) cb(`${err}`);
          else cb(null, docs);
        });
    } catch (err) {
      cb(`${err}`);
    }
  }
  
  //find by price
  function findByPrice(db, minValue, maxValue, cb) {
    minValue = parseInt(minValue, 10);
    maxValue = parseInt(maxValue, 10);
    try {
      db.collection("homes")
        .find({
          cmimi: { $gte: 12330, $lte: 23300 },
        })
        .toArray(function (err, docs) {
          if (err) cb(`${err}`);
          else cb(null, docs);
        });
    } catch (err) {
      cb(`${err}`);
    }
  }
  
  function findByRooms(db, nr_rooms, cb) {
    nr_rooms = parseInt(nr_rooms, 10);
    try {
      db.collection("homes")
        .find({
          nr_dhomash: nr_rooms,
        })
        .toArray(function (err, docs) {
          if (err) cb(`${err}`);
          else cb(null, docs);
        });
    } catch (err) {
      cb(`${err}`);
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
exports.getAllHomes=getAllHomes;
exports.getSpecificHome=getSpecificHome;
exports.getAllLandlords=getAllLandlords;
exports.getSpecificLandlord=getSpecificLandlord;
exports.getNormalHomes=getNormalHomes;
exports.getPremiumHome=getPremiumHome;
exports.findByRooms=findByRooms;
exports.findByCity=findByCity;
exports.findByPrice=findByPrice;