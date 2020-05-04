const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');
const myError=require('../error');
const Tokens=require('../schema/tokens');
const users=require('../schema/user');
const gentoken=require('../token_checkacv_generate/generate_token');

const { v4: uuidv4 } = require('uuid');
const nodemailer=require('nodemailer');
const validation=require('../validations/functions');


//Register a user
 function regUser(db,req,cb){
    let hash= bcrypt.hashSync(req.body.password,14);
    req.body.password=hash;
    
    let hash2= bcrypt.hashSync(req.body.confirmpass,14);
    req.body.confirmpass=hash2;

    const uuid=uuidv4();

    var user1=new users({
        email: req.body.email,
        password: req.body.password,
        confirmpass: req.body.confirmpass,
        username: req.body.username,
        birthday: req.body.birthday,
        gender: req.body.gender,
        status: 'inactive',
        emailCode: uuid
        });

        var mess1=validation.emailValidation(req.body.email);
        var mess2=validation.passwordValidation(req.body.password);
        var mess3=validation.userNameValidation(req.body.username);

        if(mess1!==''){
            var error=new myError('Email is not valid!','400');
                cb([error.message, ' status: ', error.statusCode]);
        }
        if(mess2!==''){
            var error=new myError('Password is not valid!','400');
                cb([error.message, ' status: ', error.statusCode]);
        }
        if(mess3!==''){
            var error=new myError('Username is not valid!','400');
                cb([error.message, ' status: ', error.statusCode]);
        }

        try{  
            
            db.collection('users').findOne({ email: req.body.email},(err,user)=>{
               if(err) cb(`${err}`);
                
               if(user){
                   var error=new myError('Email already exists','400');
                cb([error.message, ' status: ', error.statusCode]);
               } 
                
               else { 
                    db.collection('users').findOne({ username: req.body.username}, (err,user2)=>{
                        if(err) cb(`${err}`);
                         
                        if(user2){
                            var error=new myError('User with that username already exists','400');
                            cb([error.message, ' status: ', error.statusCode]);
                        } 

                        else{
                            db.collection('users').insertOne(user1,(err,doc) =>{
                                if(!doc) cb(`${err}`);
                                if(err) cb(`${err}`);

                             else {
                                    console.log(user1);

                                    const token = jwt.sign({ email: user1.email, _id: user1._id },
                                        process.env.JWT_KEY, { expiresIn:900 });
                                        
                                        var today = new Date();
                                        today.setMinutes(today.getMinutes() + 15);
                               
                                        const token2= new Tokens({
                                            token: token,
                                            status: 'active',
                                            userId: user1._id,
                                            endDate: today, 
                                            createdAt: Date.now()
                                        });
                                        var refreshtoken=gentoken.generateToken(user1);

                                        //insert this in the database: 
                                        db.collection('Tokens').insertMany([token2,refreshtoken],(err, token3)=>{
                                            if(err) {
                                                error=new myError('Something went wrong in saving the token.','500');
                                                cb([error.message,' status: ', error.statusCode]);
                                            }
                               
                if(token3.token!==null){
                                        
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
                        
                        const link="http://"+req.get('host')+"/verify/"+uuid;
                        var mailOptions={ 
                                from:'Lock.al2020@gmail.com',
                                to: user1.email,
                                subject : "Please confirm your Email account",
                                html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify.</a>"
                                };
                        console.log(mailOptions);
                                         
                        transporter.sendMail(mailOptions, function(error, response){
                        if(error)  cb(`${error}`);
                        
                        else 
                        cb(null,{message: 'User registered and message sent.',
                         token: token, refreshtoken: refreshtoken.token, _id: user1._id, username: user1.username});                   
                            
                        });            
                }  else cb('You have been logged out, please log in again.');
                                   
                                   });
                                }
                            });   
                        }
                    });
                }
            });
        }    catch(err){
            cb(`${err}`);
        }
}

exports.regUser=regUser;