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
        sip: req.body.sip,
        nr_dhomash: req.body.nr_dhomash,
        lloji: req.body.lloji,
        kati: req.body.kati,
        cmimi: req.body.cmimi,
        perfshihen: req.body.perfshihen,
        nr_banjosh: req.body.nr_banjosh,
        nr_bedrooms: req.body.nr_bedrooms,
        nr_personash: req.body.nr_personash,
        parkim: req.body.parkim,
        ashensor: req.body.ashensor,
        kondicioner: req.body.kondicioner,
        kafshe: req.body.kafshe,
        ballkon: req.body.ballkon,
        kopsht: req.body.kopsht,
        sendeGatimi: req.body.sendeGatimi,
        televizor: req.body.televizor,
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
exports.addimagetoHome=addimagetoHome;