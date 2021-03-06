const users=require('../../schema/user');
const myError=require('../../error');

//find near me
 function findNearMe(db,lati,longi,data,cb) {
  var nearMeHomes = [];
    lat = parseFloat(lati);
    long = parseFloat(longi);

    try{
    for(var i=0; i<data.length;i++) {
      elem= getDistanceFromLatLonInKm(lat,long,
        data[i].location.lat,data[i].location.long);
          if (elem<=2) {
             nearMeHomes.push(data[i]);
            }
        }
          if(nearMeHomes.length==0) {
           cb('No homes nearby found.');
          }
          else cb(null,nearMeHomes); 
        
    }catch(err){
      myError.Error(db,'get',500,2,(error,pls)=>{
        if(error) cb(error);
        else cb(pls);
      });
      }
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
     ( Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2));
    var c =( 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    var d = R * c; // Distance in km
    return d;
  }
  
  
  //Get all homes
  function getAllHomes(db,cb){
      try{ 
          db.collection('homes').find({}).toArray(function(err, docs) {
               if(err) {
                myError.Error(db,'home',200,4,(error,pls)=>{
                  if(error) cb(error);
                  else cb(pls);
                });
               }
              
              else cb(null, docs);
          });     
  
      } catch(err){
        myError.Error(db,'get',500,2,(error,pls)=>{
          if(error) cb(error);
          else cb(pls);
        });
      }
  }


  //Get Specific home
  function getSpecificHome(db,id,o_id,cb){
      try{ 
          db.collection('homes').findOne({'_id': o_id},(err,doc) =>{
          if(!doc){
            myError.Error(db,'home',200,4,(error,pls)=>{
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
  
  
  //get premiumHomes
  function getPremiumHome(db, cb) {
      try {
        db.collection("homes")
          .find({ premium: true })
          .toArray(function (err, docs) {
            if (err){
              myError.Error(db,'home',200,4,(error,pls)=>{
                if(error) cb(error);
                else cb(pls);
              });
            }
            if (!docs.length){
              myError.Error(db,'home',200,4,(error,pls)=>{
                if(error) cb(error);
                else cb(pls);
              });
            }
            else cb(null, docs);
          });
      } catch (err) {
        myError.Error(db,'get',500,2,(error,pls)=>{
          if(error) cb(error);
          else cb(pls);
        });
      }
    }
    

    //get normal home
    function getNormalHomes(db, cb) {
      try {
        db.collection("homes")
          .find({ premium: false })
          .toArray(function (err, docs) {
            if (err) {
              myError.Error(db,'home',200,4,(error,pls)=>{
                if(error) cb(error);
                else cb(pls);
              });
            }
            if (!docs.length){
              myError.Error(db,'home',200,4,(error,pls)=>{
                if(error) cb(error);
                else cb(pls);
              });
            }
            else cb(null, docs);
          });
      } catch (err) {
        myError.Error(db,'get',500,2,(error,pls)=>{
          if(error) cb(error);
          else cb(pls);
        });
      }
    }    

    //find by price
    function findByPrice(db, minValue, maxValue, cb) {
      minValue = parseInt(minValue, 10);
      maxValue = parseInt(maxValue, 10);
      try {
        db.collection("homes")
          .find({
            price: { $gte: minValue, $lte: maxValue },
          })
          .toArray(function (err, docs) {
            if (err){
              myError.Error(db,'home',200,4,(error,pls)=>{
                if(error) cb(error);
                else cb(pls);
              });
            }
            if (!docs.length){
              myError.Error(db,'home',200,4,(error,pls)=>{
                if(error) cb(error);
                else cb(pls);
              });
            }
            else cb(null, docs);
          });
      } catch (err) {
        myError.Error(db,'get',500,2,(error,pls)=>{
          if(error) cb(error);
          else cb(pls);
        });
      }
    }
    

    //Get by rooms
    function findByRooms(db, nr_rooms, cb) {
      nr_rooms = parseInt(nr_rooms, 10);
      try {
        db.collection("homes")
          .find({
            rooms: nr_rooms,
          })
          .toArray(function (err, docs) {
            if (err){
              myError.Error(db,'home',200,4,(error,pls)=>{
                if(error) cb(error);
                else cb(pls);
              });
            } 
            if (!docs.length){
              myError.Error(db,'home',200,4,(error,pls)=>{
                if(error) cb(error);
                else cb(pls);
              });
            }
            else cb(null, docs);
          });
      } catch (err) {
        myError.Error(db,'get',500,2,(error,pls)=>{
          if(error) cb(error);
          else cb(pls);
        });
      }
    }


exports.getNormalHomes=getNormalHomes;
exports.getPremiumHome=getPremiumHome;
exports.findByRooms=findByRooms;
exports.findByPrice=findByPrice;
exports.getAllHomes=getAllHomes;
exports.getSpecificHome=getSpecificHome;

exports.findNearMe=findNearMe;