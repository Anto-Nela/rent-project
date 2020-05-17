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

    var uuid=uuidv4();
    let uuid1= bcrypt.hashSync(uuid,16);
    uuid=uuid1;
    //req.body.uuid=uuid1;

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
            myError.Error(db,'email',400,6,(error,pls)=>{
                if(error) cb(error);
                else cb(pls);
              });
        }
        if(mess2!==''){
            myError.Error(db,'password',400,6,(error,pls)=>{
                if(error) cb(error);
                else cb(pls);
              });
        }
        if(mess3!==''){
            myError.Error(db,'username',400,6,(error,pls)=>{
                if(error) cb(error);
                else cb(pls);
              });
        }

        try{  
            
            db.collection('users').findOne({ email: req.body.email},(err,user)=>{
               if(err){
                myError.Error(db,'email',500,2,(error,pls)=>{
                    if(error) cb(error);
                    else cb(pls);
                  });
               }
                
               if(user){
                myError.Error(db,'email',200,26,(error,pls)=>{
                    if(error) cb(error);
                    else cb(pls);
                  });
               } 
                
               else { 
                    db.collection('users').findOne({ username: req.body.username}, (err,user2)=>{
                        if(err){
                            myError.Error(db,'username',500,2,(error,pls)=>{
                                if(error) cb(error);
                                else cb(pls);
                              });
                        } 
                         
                        if(user2){
                            myError.Error(db,'username',200,26,(error,pls)=>{
                                if(error) cb(error);
                                else cb(pls);
                              });
                        } 

                        else{
                            db.collection('users').insertOne(user1,(err,doc) =>{
                                if(!doc){
                                    myError.Error(db,'add',200,6,(error,pls)=>{
                                        if(error) cb(error);
                                        else cb(pls);
                                      });
                                } 
                                if(err){
                                    myError.Error(db,'add',500,2,(error,pls)=>{
                                        if(error) cb(error);
                                        else cb(pls);
                                      });
                                }

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
                                                myError.Error(db,'token',500,3,(error,pls)=>{
                                                    if(error) cb(error);
                                                    else cb(pls);
                                                  });
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
                                         
                        transporter.sendMail(mailOptions, function(err, response){
                        if(err){
                            myError.Error(db,'email',500,3,(error,pls)=>{
                                if(error) cb(error);
                                else cb(pls);
                              });
                        }
                        
                        else 
                        cb(null,{message: 'User registered and message sent.',
                         token: token, refreshtoken: refreshtoken.token, _id: user1._id, username: user1.username});                   
                            
                        });            
                }  else {
                    myError.Error(db,'token',500,11,(error,pls)=>{
                        if(error) cb(error);
                        else cb(pls);
                      });
                    }             
                });
              }
           });  
          }
       });
    }
 });
 }   catch(err){
    myError.Error(db,'register',500,3,(error,pls)=>{
        if(error) cb(error);
        else cb(pls);
      });
        }
}

exports.regUser=regUser;