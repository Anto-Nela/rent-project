const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const multer= require('multer');
const ejs=require('ejs');
var router = express.Router();
const fs= require('fs');

const getfunc = require('../functions/get/getfunc');
const gethomes= require('../functions/get/gethomes');
const deletefunc = require('../functions/deletefunc');
const addfunc = require('../functions/addfunc');
const updatefunc= require('../functions/updatefunc');
const reg= require('../login_out_register/register');
const lgout= require('../login_out_register/logout');
const lgin= require('../login_out_register/login');
const gentk= require('../token_checkacv_generate/refresh_tokens');
const searchomes=require('../functions/get/searchHomes');

const checkAuth= require('../check-auth');
const checkActv= require('../token_checkacv_generate/checkacvtoken');
const verify=require('../verify_email/verify');

require('dotenv/config');

//Connect to DB
const MongoClient =require('mongodb').MongoClient;
const uri = process.env.DB_CONNECTION;

MongoClient.connect(uri,{useUnifiedTopology: true}, function(err, client) {
   if(err) {
        console.log(`Error occurred while connecting to MongoDB Atlas...\n. ${err} `);
   }
   console.log('Connected...');
  var db = client.db('HB_betaVersion');


//Register a user
router.post('/register', (req, res) =>{
    
    reg.regUser(db,req,(err, user)=>{
        if(err) res.json(err);
        
       else res.json(user);
       });
});

/*
//Show the html
router.get('/',function(req, res){
  res.sendFile(__dirname +'/index.html');
});

  SET STORAGE for storing photos
 var storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null,file.originalname);
   },
   
   filename: function (req, file, cb) {
     cb(null, file.originalname)
   }
 });
 var upload = multer({ storage: storage });
*/
 /*
 //Add a picture to a home (add an /:id later to find where to save it)
 router.post('/upload/photo',checkAuth, upload.single('myImage'), (req, res) => {
  //const id = req.params.id;
  //var o_id = new mongodb.ObjectID(id);
  checkActv.checkActive(db,req,res,()=>{ 
            
    updatefunc.addimagetoHome(db,req,(err,json)=>{
    if(err) res.json(err);
   else res.json(json);
});
});
});
*/

//Log in a user
router.post('/login', (req, res)=>{

    lgin.loginUser(db,req,(err, user)=>{
        if(err) res.json(err);
       else res.json(user);
    });
});


//Generate token on request (expires after 8h)
router.post('/refreshtokens/:uemail',checkAuth, (req, res)=>{
  const uemail= req.params.uemail;
  
  checkActv.checkActive(db,req,res,()=>{ 
  gentk.postToken(db,uemail,req,res);
  });
});


//Log out a user
router.post('/logout', (req, res) => {

    lgout.logoutUser(db,req,(err,user)=>{
        if(err) res.json(err);
       else res.json(user);
    });
  });


  //Verify email
  router.get('/verify/:uuid',(req,res)=>{
      const uuid=req.params.uuid;

      verify.verifyEmail(db,uuid,(err,user)=>{
        if(err) res.json(err);
       else res.json(user);
      });
  });


   //Get all users
   router.get('/users', (req, res) =>{
    
    getfunc.getAllUsers(db,(err,json)=>{
        if(err) res.json(err);
       else res.json(json);
       });
    });

  

   //Get specific user
    router.get('/users/:id',checkAuth, (req, res) =>{
    const id = req.params.id;
    var o_id = new mongodb.ObjectID(id);
    
    checkActv.checkActive(db,req,res,()=>{ 
        
        getfunc.getSpecificUser(db,id,o_id,(err,json)=>{
        if(err) res.json(err);
       else res.json(json);
    });
    });
   });     

   //find near me 
   router.get("/nearme/:lat/:long", (req, res) => {
    const lat = req.params.lat;
    const long = req.params.long;
    gethomes.getAllHomes(db, (err, jsoni) => {
      if (err) res.json(err);
     else{
       gethomes.findNearMe(db,lat,long,jsoni,(err,info)=>{
        if (err) res.json(err);
        else res.json(info);
       });
     } 
    });
  });

  
     //search homes
     router.get("/searchHomes/:faqe", (req, res) => {
      const maxValue= req.query.cmimiMax;
      const minValue= req.query.cmimiMin;
      const rruga= req.query.rruga;
      const nrdhoma= req.query.nrdhoma;
      const nrpersona= req.query.nrpersona;
      const fq=req.params.faqe;
  
      searchomes.searchHomes(db,maxValue,minValue,rruga,nrdhoma,nrpersona,fq, (err, json) => {
        if (err){
          //const code= err.statusCode+err.reasonCode;
          res.json(err);
        } 
        else res.json(json);
      });
    });


   //get premium homes
  router.get("/homes/premiumHomes", (req, res) => {
    
    gethomes.getPremiumHome(db, (err, json) => {
      if (err) res.json(err);
     else res.json(json);
    });
  });
  
  
  //get normal homes
  router.get("/homes/normalHomes", (req, res) => {
    gethomes.getNormalHomes(db, (err, json) => {
      if (err) res.json(err);
     else res.json(json);
    });
  });

  
  //get homes by location
  router.get("/homes/city/:place", (req, res) => {
    const city = req.params.place;
    const newCity = city.charAt(0).toUpperCase() + city.slice(1);
    
    gethomes.findByCity(db, newCity, (err, json) => {
      if (err) res.json(err);
     else res.json(json);
    });
  });

  
  //get homes by min price
  router.get("/homes/price/:cmimiMax/:cmimiMin", (req, res) => {
    const maxValue = req.params.cmimiMax;
    const minValue = req.params.cmimiMin;
    
   gethomes.findByPrice(db, minValue, maxValue, (err, json) => {
      if (err) res.json(err);
     else res.json(json);
    });
  });

  
  //get homes by room number
  router.get("/homes/rooms/:nr_rooms", (req, res) => {
    const nrooms = req.params.nr_rooms;

    gethomes.findByRooms(db, nrooms, (err, json) => {
      if (err) res.json(err);
     else res.json(json);
    });
  });

  
     //Get all homes
     router.get('/homes', (req, res) =>{   
            
      gethomes.getAllHomes(db,(err,json)=>{
        if(err) res.json(err);
       else res.json(json);
      });     
    });


    //Get specific home
    router.get('/homes/:id', (req, res) =>{
        const id = req.params.id;
        var o_id = new mongodb.ObjectID(id);
        
        gethomes.getSpecificHome(db,id,o_id,(err,json)=>{
            if(err) res.json(err);
           else res.json(json);
        });

    });


    //Get all landlords
    router.get('/landlords', (req, res) =>{
        getfunc.getAllLandlords(db,(err,json)=>{
            if(err) res.json(err);
           else res.json(json);
        });
    });


    //Get specific landlord
    router.get('/landlords/:id', (req, res) =>{
        const id = req.params.id;
        var o_id = new mongodb.ObjectID(id);

        getfunc.getSpecificLandlord(db,id,o_id,(err,json)=>{
            if(err) res.json(err);
           else res.json(json);
        });
    });


    //Delete a landlord
    router.delete('/delete/landlords/:id', checkAuth, (req, res) =>{
        const id = req.params.id;
        var o_id = new mongodb.ObjectID(id);
       
        checkActv.checkActive(db,req,res,()=>{ 
            
            deletefunc.deleteLandlord(db,id,o_id,(err,json)=>{
            if(err) res.json(err);
           else res.json(json);
        });

        });
        
    });


    //Delete a user
    router.delete('/delete/users/:id', checkAuth, (req, res) =>{
        const id = req.params.id;
        var o_id = new mongodb.ObjectID(id);

        checkActv.checkActive(db,req,res,()=>{ 

            deletefunc.deleteUser(db,id,o_id,(err,json)=>{
            if(err) res.json(err);
           else res.json(json);
        });
        });
    });


    //Delete a home
    router.delete('/delete/homes/:id', checkAuth, (req, res) =>{
        const id = req.params.id;
        var o_id = new mongodb.ObjectID(id);
        
        checkActv.checkActive(db,req,res,()=>{ 
            
            deletefunc.deleteHome(db,id,o_id,(err,json)=>{
            if(err) res.json(err);
           else res.json(json);
        });
        });
    });


    //Add a landlord 
    router.post('/add/landlords/',checkAuth, (req, res) =>{
        
        checkActv.checkActive(db,req,res,()=>{
            
            addfunc.addLandlord(db,req,(err,json)=>{
            if(err) res.json(err);
           else res.json(json);
           });
         });
    });


    //Add a home
    router.post('/add/homes/',checkAuth, (req, res) =>{
        
        checkActv.checkActive(db,req,res,()=>{ 
            
            addfunc.addHome(db,req,res,(err,json)=>{
            if(err) res.json(err);
           else res.json(json);
           });
        });
    });


    //Update user info
    router.put('/update/users/:id',checkAuth,(req, res)=>{
        const id = req.params.id;
        var o_id = new mongodb.ObjectID(id);
        
        checkActv.checkActive(db,req,res,()=>{ 
           
            updatefunc.updateUser(db,req,id,o_id,(err,json)=>{
            if(err) res.json(err);
           else res.json(json);
        }); 
        });
    });


    //Update home info
    router.put('/update/homes/:id', checkAuth,(req,res) =>{
        const id = req.params.id;
        var o_id = new mongodb.ObjectID(id);
        
        checkActv.checkActive(db,req,res,()=>{ 
            
            updatefunc.updateHome(db,req,id,o_id,(err,json)=>{
            if(err) res.json(err);
           else res.json(json);
        });
        });
    });
    
    
    //Update landlord info
    router.put('/update/landlords/:id',checkAuth, (req,res) =>{
        const id = req.params.id;
        var o_id = new mongodb.ObjectID(id);
        
        checkActv.checkActive(db,req,res,()=>{
            
            updatefunc.updateLandlord(db,req,id,o_id,(err,json)=>{
            if(err) res.json(err);
           else res.json(json);
         });
       });
    });
  });
    module.exports = router;
