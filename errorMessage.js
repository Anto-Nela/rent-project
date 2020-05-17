const myError=require('./error');

async function Message(db,type, reasoncode,cb){
    try{  
     await db.collection('errorcode').findOne({
        'type': type,
        'reasonCode': reasoncode
      },(err,doc) =>{
        if (err) cb('Error');
          else  cb (null,doc.message);
      });
  }
   catch(err){
  cb('An error occurred.');
  }
  }

  module.exports.Message=Message;