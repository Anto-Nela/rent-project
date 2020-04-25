const jwt= require('jsonwebtoken');
const Tokens=require('../schema/tokens');
const users=require('../schema/user');
const gentoken=require('../token_checkacv_generate/generate_token');
const myError=require('../error');

function postToken(db,uemail,req,res){
    try{
        const token=req.headers.authorization.split(' ')[1];
        
        if (!token) {
            var error=new myError('No token provided.','401');
            return res.status(401).json([error.message,' status: ', error.statusCode]);
        }
    
        db.collection('Tokens').findOne({ token: token}, (err,tokeni1)=>{
            if(err) return res.status(500).json(`Something happend... ${err}`);

        if(tokeni1.status=='inactive' ){
          
            const token21 = jwt.sign({ email: uemail, _id: tokeni1.userId },
                process.env.JWT_REFRESHKEY, { expiresIn: '6h' });
              
                var today = new Date();
                today.setHours(today.getHours() + 6);
            
                const token2= new Tokens({
                    token: token21,
                    status: 'active',
                    userId: tokeni1.userId,
                    endDate: today, 
                    createdAt: Date.now()
                });
                
                return res.json({token: token2.token});
              }

        else  return res.json('Token is active.');
        
    });
    } catch(error){
    return res.json(`${error}`);
    }
    
}

module.exports.postToken=postToken;
