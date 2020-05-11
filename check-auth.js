const jwt= require('jsonwebtoken');

module.exports=(req, res, next)=>{
    try{
        const token=req.headers.authorization.split(' ')[1];

        if (!token) 
        return res.json({ auth: false, message: 'No token provided.' });    

        jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
            if (err) 
            return res.json({ auth: false, message: 'Failed to authenticate token.' });

          else //return res.status(200).send(decoded);
        next();
        });

    }
    catch(error){
        return res.json({message: 'Authentication failed.'});
    }
};