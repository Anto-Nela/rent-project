const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const cors = require('cors');
const allservice= require('./routers/allService');

require('dotenv/config');

app.set('view engine', 'ejs');

   app.use(cors());
   app.use(express.urlencoded({ extended: true }));
   app.use(express.json());
   
    app.use(allservice);
   
  

const PORT= process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`server running on port ${PORT} `));