message1=require('./errorMessage');

function Error(db,type,statusCode,reasonCode,cb){

      try{
       message1.Message(db,type,reasonCode,(err,json)=>{
        if(err){
          cb({
        'message': err,
        'statusCode': statusCode,
      'reasonCode': reasonCode});
    }
    else{
    /*  console.log({
        'message': json,
        'statusCode': statusCode,
      'reasonCode': reasonCode});
      */
     cb(null,{
        'message': json,
        'statusCode': statusCode,
      'reasonCode': reasonCode});
    }
      });
      }catch(err){
        cb("Error...");
      }
    }

module.exports.Error=Error;