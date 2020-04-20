const jwt= require('jsonwebtoken');
const Tokens=require('../schema/tokens');
const users=require('../schema/user');

function generateToken(user1){
    
    const token = jwt.sign({ email: user1.email, _id: user1._id },
    process.env.JWT_KEY, { expiresIn: '24h' });
  
    var today = new Date();
    today.setHours(today.getHours() + 24);

    const token2= new Tokens({
        token: token,
        status: 'active',
        userId: user1._id,
        endDate: today, 
        createdAt: Date.now()
    });
    
    return token2;
}

module.exports.generateToken=generateToken;
