const jwt= require('jsonwebtoken');
const Tokens=require('../schema/tokens');
const users=require('../schema/user');
const gentoken=require('./generate_token');
const myError=require('../error');
require('dotenv/config');

function postToken(db,uemail,req,res){
    try{
        const token=req.headers.authorization.split(' ')[1];
        
        if (!token) {
            myError.Error(db,'token',400,4,(error,pls)=>{
                if(error) res.json(error);
                else res.json(pls);
              });
        }
    
        db.collection('Tokens').findOne({ token: token}, (err,tokeni1)=>{
            if(err){
                myError.Error(db,'all',500,4,(error,pls)=>{
                    if(error) res.json(error);
                    else res.json(pls);
                  });
            } 

        if(tokeni1.status=='active'){  
            
            tokeni1.status='inactive';
            tokeni1.endDate=Date.now();
                    
            db.collection('Tokens').updateOne({token: token},{$set: tokeni1},(err,doc) =>{
                if(!doc){
                    myError.Error(db,'token',500,3,(error,pls)=>{
                        if(error) res.json(error);
                        else res.json(pls);
                      });
                        }
                    });   


            const token21 = jwt.sign({ email: uemail, _id: tokeni1.userId },
                process.env.JWT_KEY, { expiresIn: 900 });
              
                var today = new Date();
                today.setMinutes(today.getMinutes() + 15);
            
                const token2= new Tokens({
                    token: token21,
                    status: 'active',
                    userId: tokeni1.userId,
                    endDate: today, 
                    createdAt: Date.now()
                });
                
                const token22 = jwt.sign({ email: uemail, _id: tokeni1.userId },
                    process.env.JWT_KEY, { expiresIn: '8h' });
                  
                    var today2 = new Date();
                    today2.setHours(today2.getHours() + 8);
                
                    const token3= new Tokens({
                        token: token22,
                        status: 'active',
                        userId: tokeni1.userId,
                        endDate: today2, 
                        createdAt: Date.now()
                    });
                    
                    db.collection('Tokens').insertMany([token2,token3],(err, token33)=>{
                        if(err){
                            myError.Error(db,'token',500,3,(error,pls)=>{
                                if(error) res.json(error);
                                else res.json(pls);
                              });
                        } 
                    });

                return res.json({token: token2.token, refreshToken: token3.token});
              }

        else  {
            myError.Error(db,'token',400,7,(error,pls)=>{
                if(error) res.json(error);
                else res.json(pls);
              });
        }
        
    });
    } catch(error){
        myError.Error(db,'all',500,4,(error,pls)=>{
            if(error) res.json(error);
            else res.json(pls);
          });
    }
    
}

module.exports.postToken=postToken;
