const users=require('../../schema/user');
const myError=require('../../error');

//find near me
function findNearMe(lat, long, data) {
    const nearMeHomes = [];
    lat = parseFloat(lat);
    long = parseFloat(long);
  
    try{
    data.forEach((item) => {
      const elem = getDistanceFromLatLonInKm(
        lat,
        long,
        item.location.lat,
        item.location.long
      );
  
      if (elem <= 2) {
        nearMeHomes.push(item);
      }
    });
    }
    catch(err){
      var error=new myError('An error occurred while searching for homes nearby','500');
       return err;
    }
    return nearMeHomes;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }
  
  
  //Get all homes
  function getAllHomes(db,cb){
      try{ 
          db.collection('homes').find({}).toArray(function(err, docs) {
               if(err) {
                var error=new myError('No homes found!','404');
                cb([error.message, ' status: ', error.statusCode]);
               }
              
              else cb(null, docs);
          });     
  
      } catch(err){
        var error=new myError('An error occurred while searching for homes','500');
        cb([error.message, ' status: ', error.statusCode]);
      }
  }
  
  //searchi
  function searchHomes(db,maxValue,minValue,qytet,nrrooms,cb){

    minprice = parseInt(minValue, 10);
    maxprice = parseInt(maxValue, 10);
    rooms = parseInt(nrrooms, 10);
   // roommates = parseInt(nrroommates, 10);
  try{
   if(rooms==0){

      db.collection("homes").find(
        { 'adress.qytet': qytet,
           cmimi: { $gte: minprice, $lte: maxprice }
      }).toArray((err,doc)=>{
        if(err){
          var error=new myError('No homes found','500');
          cb([error.message, ' status: ', error.statusCode]);
        } 
        if (!doc.length){
          var error=new myError('No homes found','404');
          cb([error.message, ' status: ', error.statusCode]);
        }
        else cb(null, doc);
      });

    }
    else{
     
      db.collection("homes").find(
      { 'adress.qytet': qytet,
         cmimi: { $gte: minprice, $lte: maxprice },
         nr_dhomash: rooms
    }).toArray((err,doc)=>{
      if(err){
        error=new myError('No homes found','404');
        cb([error.message,' status: ', error.statusCode]);
      }
      if (!doc.length){
        var error=new myError('No homes found','404');
        cb([error.message, ' status: ', error.statusCode]);
      }
      else cb(null, doc);
    });
    }
  } 
  catch(err){
    var error=new myError('An error occurred while searching for homes','500');
    cb([error.message, ' status: ', error.statusCode]);
  }
  }
  

  //Get Specific home
  function getSpecificHome(db,id,o_id,cb){
      try{ 
          db.collection('homes').findOne({'_id': o_id},(err,doc) =>{
          if(!doc){
            var error=new myError('No home with that id found','404');
            cb([error.message, ' status: ', error.statusCode]);
          }
  
          else cb(null, doc);
          });    
      }
       catch(err){
        var error=new myError('An error occurred while searching for the home with that id','500');
        cb([error.message, ' status: ', error.statusCode]);
      }
  }
  
  
  //get premiumHomes
  function getPremiumHome(db, cb) {
      try {
        db.collection("homes")
          .find({ premium: true })
          .toArray(function (err, docs) {
            if (err){
              var error=new myError('No premium homes found','404');
                cb([error.message, ' status: ', error.statusCode]);
            }
            if (!docs.length){
              var error=new myError('No premium homes found','404');
              cb([error.message, ' status: ', error.statusCode]);
            }
            else cb(null, docs);
          });
      } catch (err) {
        var error=new myError('An error occurred while searching for premium homes','500');
        cb([error.message, ' status: ', error.statusCode]);
      }
    }
    

    //get normal home
    function getNormalHomes(db, cb) {
      try {
        db.collection("homes")
          .find({ premium: false })
          .toArray(function (err, docs) {
            if (err) {
              var error=new myError('No homes found','404');
              cb([error.message, ' status: ', error.statusCode]);
            }
            if (!docs.length){
              var error=new myError('No homes found','404');
              cb([error.message, ' status: ', error.statusCode]);
            }
            else cb(null, docs);
          });
      } catch (err) {
        var error=new myError('An error occurred while searching for homes','500');
        cb([error.message, ' status: ', error.statusCode]);
      }
    }
    

    //Find by city
    function findByCity(db, place, cb) {
      try {
        db.collection("homes")
          .find({ "adress.qytet": place })
          .toArray(function (err, docs) {
            if (err){
              var error=new myError('No homes by that city found','404');
              cb([error.message, ' status: ', error.statusCode]);
            }
            if (!docs.length){
              var error=new myError('No homes by that city found','404');
              cb([error.message, ' status: ', error.statusCode]);
            }
            else cb(null, docs);
          });
      } catch (err) {
        var error=new myError('An error occurred while searching for homes by city','500');
        cb([error.message, ' status: ', error.statusCode]);
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
            if (err){
              var error=new myError('No homes by those prices found','404');
              cb([error.message, ' status: ', error.statusCode]);
            }
            if (!docs.length){
              var error=new myError('No homes by those prices found','404');
              cb([error.message, ' status: ', error.statusCode]);
            }
            else cb(null, docs);
          });
      } catch (err) {
        var error=new myError('An error occurred while searching for homes by those prices','500');
        cb([error.message, ' status: ', error.statusCode]);
      }
    }
    

    //Get by rooms
    function findByRooms(db, nr_rooms, cb) {
      nr_rooms = parseInt(nr_rooms, 10);
      try {
        db.collection("homes")
          .find({
            nr_dhomash: nr_rooms,
          })
          .toArray(function (err, docs) {
            if (err){
              var error=new myError('No homes by rooms found','404');
              cb([error.message, ' status: ', error.statusCode]);
            } 
            if (!docs.length){
              var error=new myError('No homes by rooms found','404');
              cb([error.message, ' status: ', error.statusCode]);
            }
            else cb(null, docs);
          });
      } catch (err) {
        var error=new myError('An error occurred while searching for homes by rooms','500');
        cb([error.message, ' status: ', error.statusCode]);
      }
    }


exports.getNormalHomes=getNormalHomes;
exports.getPremiumHome=getPremiumHome;
exports.findByRooms=findByRooms;
exports.findByCity=findByCity;
exports.findByPrice=findByPrice;
exports.getAllHomes=getAllHomes;
exports.getSpecificHome=getSpecificHome;
exports.searchHomes=searchHomes;

module.exports.findNearMe=findNearMe;
module.exports.getDistanceFromLatLonInKm=getDistanceFromLatLonInKm;