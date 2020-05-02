const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const multer= require('multer');
const ejs=require('ejs');
const apiAdapter = require("./apiAdapter");
var router = express.Router();

const getfunc = require('../functions/getfunc');
const deletefunc = require('../functions/deletefunc');
const addfunc = require('../functions/addfunc');
const updatefunc= require('../functions/updatefunc');
const reg= require('../login_out_register/register');
const lgout= require('../login_out_register/logout');
const lgin= require('../login_out_register/login');
const gentk= require('../token_checkacv_generate/post_tokens');

const checkAuth= require('../check-auth');
const checkActv= require('../token_checkacv_generate/checkacvtoken');
const verify=require('../verify_email/verify');

require('dotenv/config');
const BASE_URL = "https://rent-project.herokuapp.com";
const api = apiAdapter(BASE_URL);

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
        if(err) res.status(400).json({message:`${err}`});
        res.json(user);
       });
});


//Log in a user
router.post('/login', (req, res)=>{

    lgin.loginUser(db,req,(err, user)=>{
        if(err) res.status(400).json({message: `${err}`});
        res.json(user);
    });
});

/*
//Generate token on request (expires after 6h)
app.post('/generatetoken/:uemail', (req, res)=>{
  const uemail= req.params.uemail;
  gentk.postToken(db,uemail,req,res);
});
*/

//Log out a user
router.get('/logout', (req, res) => {

    lgout.logoutUser(db,req,(err,user)=>{
        if(err) res.status(500).json({message: `${err}`});
        res.json(user);
    });
  });


  //Verify email
  router.get('/verify/:uuid',(req,res)=>{
      const uuid=req.params.uuid;

      verify.verifyEmail(db,uuid,(err,user)=>{
        if(err) res.status(500).json({message: `${err}`});
        res.json(user);
      });
  });


   //Get all users
   router.get('/users', (req, res) =>{
    
    getfunc.getAllUsers(db,(err,json)=>{
        if(err) res.status(404).json({message: `${err}`});
        res.json(json);
       });
    });

  

   //Get specific user
    router.get('/users/:id',checkAuth, (req, res) =>{
    const id = req.params.id;
    var o_id = new mongodb.ObjectID(id);
    
    checkActv.checkActive(db,req,res,()=>{ 
        
        getfunc.getSpecificUser(db,id,o_id,(err,json)=>{
        if(err) res.status(404).json({message: `${err}`});
        res.json(json);
    });
    });
   });     


   //get premium homes
  router.get("/homes/premiumHomes", (req, res) => {
    getfunc.getPremiumHome(db, (err, json) => {
      if (err) res.status(404).json({ message: `${err}` });
      res.json(json);
    });
  });
  
  
  //get normal homes
  router.get("/homes/normalHomes", (req, res) => {
    getfunc.getNormalHomes(db, (err, json) => {
      if (err) res.status(404).json({ message: `${err}` });
      res.json(json);
    });
  });

  
  //get homes by location
  router.get("/homes/city/:place", (req, res) => {
    const city = req.params.place;
    const newCity = city.charAt(0).toUpperCase() + city.slice(1);
    
    getfunc.findByCity(db, newCity, (err, json) => {
      if (err) res.status(404).json({ message: `${err}` });
      res.json(json);
    });
  });

  
  //get homes by min price
  router.get("/homes/price/:cmimiMax/:cmimiMin", (req, res) => {
    const maxValue = req.params.cmimiMax;
    const minValue = req.params.cmimiMin;
    
    getfunc.findByPrice(db, minValue, maxValue, (err, json) => {
      if (err) res.status(404).json({ message: `${err}` });
      res.json(json);
    });
  });

  
  //get homes by room number
  router.get("/homes/rooms/:nr_rooms", (req, res) => {
    const nrooms = req.params.nr_rooms;

    getfunc.findByRooms(db, nrooms, (err, json) => {
      if (err) res.status(404).json({ message: `${err}` });
      res.json(json);
    });
  });

  
     //Get all homes
     router.get('/homes', (req, res) =>{   
            getfunc.getAllHomes(db,(err,json)=>{
                     if(err) res.status(404).json({message: `${err}`});
                     res.json(json);
                    });     
       });


    //Get specific home
    router.get('/homes/:id', (req, res) =>{
        const id = req.params.id;
        var o_id = new mongodb.ObjectID(id);
        
        getfunc.getSpecificHome(db,id,o_id,(err,json)=>{
            if(err) res.status(404).json({message: `${err}`});
            res.json(json);
        });

    });


    //Get all landlords
    router.get('/landlords', (req, res) =>{
        getfunc.getAllLandlords(db,(err,json)=>{
            if(err) res.status(404).json({message: `${err}`});
            res.json(json);
        });
    });


    //Get specific landlord
    router.get('/landlords/:id', (req, res) =>{
        const id = req.params.id;
        var o_id = new mongodb.ObjectID(id);

        getfunc.getSpecificLandlord(db,id,o_id,(err,json)=>{
            if(err) res.status(404).json({message: `${err}`});
            res.json(json);
        });
    });


    //Delete a landlord
    router.delete('/delete/landlords/:id', checkAuth, (req, res) =>{
        const id = req.params.id;
        var o_id = new mongodb.ObjectID(id);
       
        checkActv.checkActive(db,req,res,()=>{ 
            
            deletefunc.deleteLandlord(db,id,o_id,(err,json)=>{
            if(err) res.status(404).json({message: `${err}`});
            res.json(json);
        });

        });
        
    });


    //Delete a user
    router.delete('/delete/users/:id', checkAuth, (req, res) =>{
        const id = req.params.id;
        var o_id = new mongodb.ObjectID(id);

        checkActv.checkActive(db,req,res,()=>{ 

            deletefunc.deleteUser(db,id,o_id,(err,json)=>{
            if(err) res.status(404).json({message: `${err}`});
            res.json(json);
        });
        });
    });


    //Delete a home
    router.delete('/delete/homes/:id', checkAuth, (req, res) =>{
        const id = req.params.id;
        var o_id = new mongodb.ObjectID(id);
        
        checkActv.checkActive(db,req,res,()=>{ 
            
            deletefunc.deleteHome(db,id,o_id,(err,json)=>{
            if(err) res.status(404).json({message: `${err}`});
            res.json(json);
        });
        });
    });


    //Add a landlord 
    router.post('/add/landlords/',checkAuth, (req, res) =>{
        
        checkActv.checkActive(db,req,res,()=>{
            
            addfunc.addLandlord(db,req,(err,json)=>{
            if(err) res.status(404).json({message: `${err}`});
            res.json(json);
           });
         });
    });


    //Add a home
    router.post('/add/homes/',checkAuth, (req, res) =>{
        
        checkActv.checkActive(db,req,res,()=>{ 
            
            addfunc.addHome(db,req,(err,json)=>{
            if(err) res.status(404).json({message: `${err}`});
            res.json(json);
           });
        });
    });


    //Update user info
    router.put('/update/users/:id',checkAuth,(req, res)=>{
        const id = req.params.id;
        var o_id = new mongodb.ObjectID(id);
        
        checkActv.checkActive(db,req,res,()=>{ 
           
            updatefunc.updateUser(db,req,id,o_id,(err,json)=>{
            if(err) res.status(404).json({message: `${err}`});
            res.json(json);
        }); 
        });
    });


    //Update home info
    router.put('/update/homes/:id', checkAuth,(req,res) =>{
        const id = req.params.id;
        var o_id = new mongodb.ObjectID(id);
        
        checkActv.checkActive(db,req,res,()=>{ 
            
            updatefunc.updateHome(db,req,id,o_id,(err,json)=>{
            if(err) res.status(404).json({message: `${err}`});
            res.json(json);
        });
        });
    });
    
    
    //Update landlord info
    router.put('/update/landlords/:id',checkAuth, (req,res) =>{
        const id = req.params.id;
        var o_id = new mongodb.ObjectID(id);
        
        checkActv.checkActive(db,req,res,()=>{
            
            updatefunc.updateLandlord(db,req,id,o_id,(err,json)=>{
            if(err) res.status(404).json({message: `${err}`});
            res.json(json);
         });
       });
    });
  });
    module.exports = router;
