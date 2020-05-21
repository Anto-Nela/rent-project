const users=require('../schema/user');
const myError=require('../error');

//Add a home
function addHome(db,req,res,cb){
    let home1={
        //img: req.body.img, 
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
    db.collection('homes').insertOne(home1,(err,doc) =>{
    if(!doc){
        myError.Error(db,'add',200,6,(error,pls)=>{
            if(error) cb(error);
            else cb(pls);
          });
    }

       else cb(null, 'Home added.');

    });    
}
 catch(err){
    myError.Error(db,'add',500,2,(error,pls)=>{
        if(error) cb(error);
        else cb(pls);
      });
}
}


//Add a landlord
function addLandlord(db,req,cb){
    let landlord1={
        email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    owned: req.body.owned
    }
    
    try{ 
        db.collection('landlords').insertOne(landlord1,(err,doc) =>{
        if(!doc){
        myError.Error(db,'add',200,6,(error,pls)=>{
            if(error) cb(error);
            else cb(pls);
          });
        }

            cb(null,'Landlord added.');
   
        });    
    }
     catch(err){
        myError.Error(db,'add',500,2,(error,pls)=>{
            if(error) cb(error);
            else cb(pls);
          });
    }
}



exports.addHome=addHome;
exports.addLandlord=addLandlord;