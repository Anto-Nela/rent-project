//Add a home
function addHome(db,req,cb){
    let home1={
        img: req.body.img,
        description: req.body.description,
        past_refernces: req.body.past_refernces,
        cmimi: req.body.cmimi,
        adress: req.body.adress,
        renting: req.body.renting,
        siperfaqa: req.body.siperfaqa,
        lloji: req.body.lloji,
        nr_dhomash: req.body.nr_dhomash
    }
    
    try{ 
    db.collection('homes').insertOne(home1,(err,doc) =>{
    if(!doc) cb(`${err}`);

       else cb(null, 'Home added.');

    });    
}
 catch(err){
    cb(`${err}`);
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
        if(!doc) cb(`${err}`);

            cb(null,'Landlord added.');
   
        });    
    }
     catch(err){
        cb(`${err}`);
    }
}



exports.addHome=addHome;
exports.addLandlord=addLandlord;