const users=require('../schema/user');
const myError=require('../error');

//Add a home
function addHome(db,req,res,cb){
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
    let home1={
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