const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');
const myError=require('../error');
const Tokens=require('../schema/tokens');
const users=require('../schema/user');
const gentoken=require('../token_checkacv_generate/generate_token');

const { v4: uuidv4 } = require('uuid');
const nodemailer=require('nodemailer');
const validation=require('../validations/functions');

// Login user
function loginUser(db,req,cb){
    try{
    db.collection('users').findOne({ email: req.body.email}, (err,user)=>{
        if(!user || !bcrypt.compareSync(req.body.password, user.password )) {
            var error=new myError('Incorrect email/password','400');
            cb([error.message,' status: ', error.statusCode]);
        }
       else if(user.status=='inactive'){
            
            var transporter = nodemailer.createTransport({ 
                service:'gmail',
                host: 'smtp.gmail.com',
                port:587,
                secure: false,
                requireTLS: true,
                auth: {
                user: 'Lock.al2020@gmail.com',
                pass: process.env.EMAIL_PASS
                    }
                });          
            
            const link="http://"+req.get('host')+"/verify/"+user.emailCode;
            var mailOptions={ 
                    from:'Lock.al2020@gmail.com',
                    to: user.email,
                    subject : "Please confirm your Email account",
                    html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify.</a>"
                    };           
                             
            transporter.sendMail(mailOptions, function(error, response){
            if(error)  {
                var error=new myError(`${error}`,'404');
                cb([error.message,' status: ', error.statusCode]);
            }
            
            else {

            const token = jwt.sign({ email: user.email, _id: user._id },
            process.env.JWT_KEY, { expiresIn: 900 });

         var today = new Date();
         today.setMinutes(today.getMinutes() + 15);

         const token2= new Tokens({
             token: token,
             status: 'active',
             userId: user._id,
             endDate: today, 
             createdAt: Date.now()
         });
         var refreshtoken=gentoken.generateToken(user);

         //insert this in the database: 
         db.collection('Tokens').insertMany([token2,refreshtoken],(err, token3)=>{
             if(err) {
                var error=new myError('Something went wrong in saving the token.','500');
                cb([error.message,' status: ', error.statusCode]);
             }

             if(token3.token!==null){
               cb(null,{message: 'Your account has not been verified, please check your email and click on the link to verify your account.',
             token: token, refreshtoken: refreshtoken.token, _id: user._id, username: user.username}); 
             }
             else cb('You have been logged out, please log in again.');
             //cb(null,{message: 'Successfully logged in.', token: token});
             //console.log(token3);
         });
        }       
     });
    }
    else{

        const token = jwt.sign({ email: user.email, _id: user._id },
            process.env.JWT_KEY, { expiresIn: 900 });

         var today = new Date();
         today.setMinutes(today.getMinutes() + 15);

         const token22= new Tokens({
             token: token,
             status: 'active',
             userId: user._id,
             endDate: today, 
             createdAt: Date.now()
         });
         var refreshtoken=gentoken.generateToken(user);

         //insert this in the database: 
         db.collection('Tokens').insertMany([token22,refreshtoken],(err, token8)=>{
             if(err) {
                var error=new myError('Something went wrong in saving the token.','500');
                cb([error.message,' status: ', error.statusCode]);
             }

             if(token8.token!==null){
               cb(null,{message: 'Sucessfully logged in.',
                token: token, refreshtoken: refreshtoken.token, _id: user._id, username: user.username}); 
             }
             else cb('You have been logged out, please log in again.');
             //cb(null,{message: 'Successfully logged in.', token: token});
             //console.log(token3);
         });

    }
    });       
        } catch(err){
            var error=new myError(`${err}`,'500');
            cb([error.message,' status: ', error.statusCode]);
    }
}


exports.loginUser=loginUser;