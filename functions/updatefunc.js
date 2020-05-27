const users=require('../schema/user');
const myError=require('../error');
const multer= require('multer');
const fs= require('fs');

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
            myError.Error(db,'update',200,6,(error,pls)=>{
                if(error) cb(error);
                else cb(pls);
              });
        } 

            else cb(null,'User information updated.');
        });   
   }
catch(err){
    myError.Error(db,'update',500,2,(error,pls)=>{
        if(error) cb(error);
        else cb(pls);
      });
}
}

//Update home info
function updateHome(db,req,id,o_id,cb){
    /*
    var img = fs.readFileSync(req.file.path,'base64', function(err, data) {
        if (err){
            myError.Error(db,'update',200,6,(error,pls)=>{
                if(error) cb(error);
                else cb(pls);
             });
        }
        console.log(data);
      });
      
      var finalImg = {
          contentType: req.file.mimetype,
          image:  new Buffer(img, 'base64')
       };
    */
    
    let updhome={
        //img: finalImg,
        adress: req.body.adress,
        area: req.body.area,
        rooms: req.body.rooms,
        type: req.body.type,
        floor: req.body.floor,
        price: req.body.price,
        water: req.body.water,
        electricity: req.body.electricity,
        internet: req.body.internet,
        bathrooms: req.body.bathrooms,
        bedrooms: req.body.bedrooms,
        tenants: req.body.tenants,
        parking: req.body.parking,
        elevator: req.body.elevator,
        air_conditioner: req.body.air_conditioner,
        animals: req.body.animals,
        balcony: req.body.balcony,
        garden: req.body.garden,
        kitchenware: req.body.kitchenware,
        tv: req.body.tv,
        furnished: req.body.furnished,
        premium: req.body.premium,
        description: req.body.description
    }

    try{
        db.collection('homes').updateOne({'_id': o_id},{$set: updhome},(err,doc) =>{
            if(!doc) {
                myError.Error(db,'update',200,6,(error,pls)=>{
                    if(error) cb(error);
                    else cb(pls);
                  });
            }
    
                else cb(null,'Home information updated.');
            });   
    }
    catch(err){
        myError.Error(db,'update',500,2,(error,pls)=>{
            if(error) cb(error);
            else cb(pls);
          });
    }
}

/*Update image
function addimagetoHome(db,req,cb){
   
   var img = fs.readFileSync(req.file.path,'base64', function(err, data) {
    if (err){
        myError.Error(db,'update',200,6,(error,pls)=>{
            if(error) cb(error);
            else cb(pls);
         });
    }
    console.log(data);
  });
  
  var finalImg = {
      contentType: req.file.mimetype,
      image:  new Buffer(img, 'base64')
   };
  
   try{
       db.collection('imagetester').insertOne(finalImg, (err, result) => {
           if (err){
               myError.Error(db,'update',200,6,(error,pls)=>{
                   if(error) cb(error);
                   else cb(pls);
                });
            }
            else{
                console.log(result);
                console.log('Saved to database.');
                cb(null,result);
            }
        });
    }catch(error){
        myError.Error(db,'update',500,2,(error,pls)=>{
            if(error) cb(error);
            else cb(pls);
          });
    }
}
*/


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
                myError.Error(db,'update',200,6,(error,pls)=>{
                    if(error) cb(error);
                    else cb(pls);
                  });
            }
    
                else cb(null,'Landlord information updated.');
            });   
    }
    catch(err){
        myError.Error(db,'update',500,2,(error,pls)=>{
            if(error) cb(error);
            else cb(pls);
          });
    }

}


exports.updateUser=updateUser;
exports.updateHome=updateHome;
exports.updateLandlord=updateLandlord;
//exports.addimagetoHome=addimagetoHome;