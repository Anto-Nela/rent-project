const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const cors = require('cors');
const multer= require('multer');
const ejs=require('ejs');

const getfunc = require('./functions/getfunc');
const deletefunc = require('./functions/deletefunc');
const addfunc = require('./functions/addfunc');
const updatefunc= require('./functions/updatefunc');
const reg= require('./login_out_register/register');
const lgout= require('./login_out_register/logout');
const lgin= require('./login_out_register/login');

const checkAuth= require('./check-auth');
const checkActv= require('./token_checkacv_generate/checkacvtoken');
const verify=require('./verify_email/verify');

require('dotenv/config');

 app.use(cors());
   app.use(express.urlencoded({ extended: true }));
   app.use(express.json());

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
app.post('/register', (req, res) =>{
        
    reg.regUser(db,req,(err, user)=>{
        if(err) res.status(400).json({message:`${err}`});
        res.json(user);
       });
});


//Log in a user
app.post('/login', (req, res)=>{

    lgin.loginUser(db,req,(err, user)=>{
        if(err) res.status(400).json({message: `${err}`});
        res.json(user);
    });
});


//Log out a user
app.get('/logout', (req, res) => {
  
    lgout.logoutUser(db,req,(err,user)=>{
        if(err) res.status(500).json({message: `${err}`});
        res.json(user);
    });
  });

  //Verify email
  app.get('/verify/:uuid',(req,res)=>{
      const uuid=req.params.uuid;

      verify.verifyEmail(db,uuid,(err,user)=>{
        if(err) res.status(500).json({message: `${err}`});
        res.json(user);
      });
  });


   //Get all users
   app.get('/users', (req, res) =>{
    getfunc.getAllUsers(db,(err,json)=>{
        if(err) res.status(404).json({message: `${err}`});
        res.json(json);
       });
    });
  

   //Get specific user
    app.get('/users/:id',checkAuth, (req, res) =>{
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
  app.get("/homes/premiumHomes", (req, res) => {
    getfunc.getPremiumHome(db, (err, json) => {
      if (err) res.status(404).json({ message: `${err}` });
      res.json(json);
    });
  });
  
  
  //get normal homes
  app.get("/homes/normalHomes", (req, res) => {
    getfunc.getNormalHomes(db, (err, json) => {
      if (err) res.status(404).json({ message: `${err}` });
      res.json(json);
    });
  });

  
  //get homes by location
  app.get("/homes/city/:place", (req, res) => {
    const city = req.params.place;
    const newCity = city.charAt(0).toUpperCase() + city.slice(1);
    
    getfunc.findByCity(db, newCity, (err, json) => {
      if (err) res.status(404).json({ message: `${err}` });
      res.json(json);
    });
  });

  
  //get homes by min price
  app.get("/homes/price/:cmimiMax/:cmimiMin", (req, res) => {
    const maxValue = req.params.cmimiMax;
    const minValue = req.params.cmimiMin;
    
    getfunc.findByPrice(db, minValue, maxValue, (err, json) => {
      if (err) res.status(404).json({ message: `${err}` });
      res.json(json);
    });
  });

  
  //get homes by room number
  app.get("/homes/rooms/:nr_rooms", (req, res) => {
    const nrooms = req.params.nr_rooms;

    getfunc.findByRooms(db, nrooms, (err, json) => {
      if (err) res.status(404).json({ message: `${err}` });
      res.json(json);
    });
  });

  
     //Get all homes
     app.get('/homes', (req, res) =>{   
            getfunc.getAllHomes(db,(err,json)=>{
                     if(err) res.status(404).json({message: `${err}`});
                     res.json(json);
                    });     
       });


    //Get specific home
    app.get('/homes/:id', (req, res) =>{
        const id = req.params.id;
        var o_id = new mongodb.ObjectID(id);
        
        getfunc.getSpecificHome(db,id,o_id,(err,json)=>{
            if(err) res.status(404).json({message: `${err}`});
            res.json(json);
        });

    });


    //Get all landlords
    app.get('/landlords', (req, res) =>{
        getfunc.getAllLandlords(db,(err,json)=>{
            if(err) res.status(404).json({message: `${err}`});
            res.json(json);
        });
    });


    //Get specific landlord
    app.get('/landlords/:id', (req, res) =>{
        const id = req.params.id;
        var o_id = new mongodb.ObjectID(id);

        getfunc.getSpecificLandlord(db,id,o_id,(err,json)=>{
            if(err) res.status(404).json({message: `${err}`});
            res.json(json);
        });
    });


    //Delete a landlord
    app.delete('/delete/landlords/:id', checkAuth, (req, res) =>{
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
    app.delete('/delete/users/:id', checkAuth, (req, res) =>{
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
    app.delete('/delete/homes/:id', checkAuth, (req, res) =>{
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
    app.post('/add/landlords/',checkAuth, (req, res) =>{
        
        checkActv.checkActive(db,req,res,()=>{
            
            addfunc.addLandlord(db,req,(err,json)=>{
            if(err) res.status(404).json({message: `${err}`});
            res.json(json);
           });
         });
    });


    //Add a home
    app.post('/add/homes/',checkAuth, (req, res) =>{
        
        checkActv.checkActive(db,req,res,()=>{ 
            
            addfunc.addHome(db,req,(err,json)=>{
            if(err) res.status(404).json({message: `${err}`});
            res.json(json);
           });
        });
    });


    //Update user info
    app.put('/update/users/:id',checkAuth,(req, res)=>{
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
    app.put('/update/homes/:id', checkAuth,(req,res) =>{
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
    app.put('/update/landlords/:id',checkAuth, (req,res) =>{
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


const PORT= process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`server running on port ${PORT} `));