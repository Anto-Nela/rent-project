const users=require('../schema/user');
const myError=require('../error');

//Delete a User
function deleteUser(db,id,o_id,cb){
    try{ 
        db.collection('users').deleteOne({'_id': o_id},(err,doc) =>{
        if(err) {
            myError.Error(db,'delete',200,6,(error,pls)=>{
                if(error) cb(error);
                else cb(pls);
              });
        }

        if (doc.deletedCount==0){
            myError.Error(db,'delete',200,6,(error,pls)=>{
                if(error) cb(error);
                else cb(pls);
              });
          }

            else cb(null,'User deleted');
        });    
    }
     catch(err){
        myError.Error(db,'delete',500,2,(error,pls)=>{
            if(error) cb(error);
            else cb(pls);
          });
    }
}

//Delete a Home
function deleteHome(db,id,o_id,cb){
    try{ 
        db.collection('homes').deleteOne({'_id': o_id},(err,doc) =>{
            if(err) {
                myError.Error(db,'delete',200,6,(error,pls)=>{
                    if(error) cb(error);
                    else cb(pls);
                  });
            }

            if (doc.deletedCount==0){
                myError.Error(db,'delete',200,6,(error,pls)=>{
                    if(error) cb(error);
                    else cb(pls);
                  });
              }

            else cb(null,'Home deleted');
        });    
    }
     catch(err){
        myError.Error(db,'delete',500,2,(error,pls)=>{
            if(error) cb(error);
            else cb(pls);
          });
    }
}


//Delete a landlord
function deleteLandlord(db,id,o_id,cb){
    try{ 
        db.collection('landlords').deleteOne({'_id': o_id},(err,doc) =>{
            if(err){
                myError.Error(db,'delete',200,6,(error,pls)=>{
                    if(error) cb(error);
                    else cb(pls);
                  });
              } 

              if (doc.deletedCount==0){
                myError.Error(db,'delete',200,6,(error,pls)=>{
                    if(error) cb(error);
                    else cb(pls);
                  });
              }

            else cb(null,'Landlord deleted');
        });    
    }
     catch(err){
        myError.Error(db,'delete',500,2,(error,pls)=>{
            if(error) cb(error);
            else cb(pls);
          });
    }
}



exports.deleteUser=deleteUser;
exports.deleteHome=deleteHome;
exports.deleteLandlord=deleteLandlord;