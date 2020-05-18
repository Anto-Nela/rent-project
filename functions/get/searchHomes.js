const users=require('../../schema/user');
const myError=require('../../error');

//searchi
function searchHomes(db,maxValue,minValue,rruga,nrdhoma,nrpersona,cb){

    minprice = parseInt(minValue, 10);
    maxprice = parseInt(maxValue, 10);
    dhoma = parseInt(nrdhoma, 10);
   persona = parseInt(nrpersona, 10);
   
  try{
    
//rasti kur useri ve personat (roommates) dhe dhomat 0
  if(persona==0&&dhoma==0){

      db.collection("homes").find(
        { 'adress.rruga': {'$regex' : '.*' + rruga + '.*'},
           cmimi: { $gte: minprice, $lte: maxprice }
      }).toArray((err,doc)=>{
        if(err){
          myError.Error(db,'home',200,4,(error,pls)=>{
            if(error) cb(error);
            else cb(pls);
          });  
        } 
        if (!doc.length){
          myError.Error(db,'home',200,4,(error,pls)=>{
            if(error) cb(error);
            else cb(pls);
          });  
        }
        else cb(null, doc);
      });
    }

    //rasti kur useri ve dhomat 0
   else if(dhoma==0){

      db.collection("homes").find(
        { 'adress.rruga': {'$regex' : '.*' + rruga + '.*'},
           cmimi: { $gte: minprice, $lte: maxprice },
           nr_personash: persona
      }).toArray((err,doc)=>{
        if(err){
          myError.Error(db,'home',200,4,(error,pls)=>{
            if(error) cb(error);
            else cb(pls);
          });  
        } 
        if (!doc.length){
          myError.Error(db,'home',200,4,(error,pls)=>{
            if(error) cb(error);
            else cb(pls);
          });  
        }
        else cb(null, doc);
      });
    }

    //rasti kur useri ve personat (roommates) 0
   else if(persona==0){

        db.collection("homes").find(
          { 'adress.rruga': {'$regex' : '.*' + rruga + '.*'},
             cmimi: { $gte: minprice, $lte: maxprice },
             'nr_dhomash': dhoma
        }).toArray((err,doc)=>{
          if(err){
            myError.Error(db,'home',200,4,(error,pls)=>{
              if(error) cb(error);
              else cb(pls);
            });  
          } 
          if (!doc.length){
            myError.Error(db,'home',200,4,(error,pls)=>{
              if(error) cb(error);
              else cb(pls);
            });  
          }
          else cb(null, doc);
        });
      }

      //kur useri ve dhomat me shum se 4
     else if(dhoma==4){

        db.collection("homes").find(
          { 'adress.rruga': {'$regex' : '.*' + rruga + '.*'},
             cmimi: { $gte: minprice, $lte: maxprice },
             'nr_personash': persona,
             'nr_dhomash': {$gte:3}
        }).toArray((err,doc)=>{
          if(err){
            myError.Error(db,'home',200,4,(error,pls)=>{
              if(error) cb(error);
              else cb(pls);
            });  
          } 
          if (!doc.length){
            myError.Error(db,'home',200,4,(error,pls)=>{
              if(error) cb(error);
              else cb(pls);
            });  
          }
          else cb(null, doc);
        });
      }

     else if(persona==4){

        db.collection("homes").find(
          { 'adress.rruga': {'$regex' : '.*' + rruga + '.*'},
             cmimi: { $gte: minprice, $lte: maxprice },
             'nr_personash': {$gte:3},
             'nr_dhomash': dhoma
        }).toArray((err,doc)=>{
          if(err){
            myError.Error(db,'home',200,4,(error,pls)=>{
              if(error) cb(error);
              else cb(pls);
            });  
          } 
          if (!doc.length){
            myError.Error(db,'home',200,4,(error,pls)=>{
              if(error) cb(error);
              else cb(pls);
            });  
          }
          else cb(null, doc);
        });
      }

      //kur useri ve dhoma dhe persona(roommates) me shum se 4 
     else if(dhoma==4 && persona==4){

        db.collection("homes").find(
          { 'adress.rruga': {'$regex' : '.*' + rruga + '.*'},
             cmimi: { $gte: minprice, $lte: maxprice },
             'nr_personash': {$gte:3},
             'nr_dhomash': {$gte:3}
        }).toArray((err,doc)=>{
          if(err){
            myError.Error(db,'home',200,4,(error,pls)=>{
              if(error) cb(error);
              else cb(pls);
            });  
          } 
          if (!doc.length){
            myError.Error(db,'home',200,4,(error,pls)=>{
              if(error) cb(error);
              else cb(pls);
            });  
          }
          else cb(null, doc);
        });
      }
      

    else{
     
      db.collection("homes").find(
      { 'adress.rruga': {'$regex' : '.*' + rruga + '.*'},
         cmimi: { $gte: minprice, $lte: maxprice },
         'nr_dhomash': dhoma,
         'nr_personash': persona
    }).toArray((err,doc)=>{
      if(err){
        myError.Error(db,'home',200,4,(error,pls)=>{
          if(error) cb(error);
          else cb(pls);
        });
      }
      if (!doc.length){
        myError.Error(db,'home',200,4,(error,pls)=>{
            if(error) cb(error);
            else cb(pls);
          });
      }
      else cb(null, doc);
    });
    }
  } 
  catch(err){
    myError.Error(db,'get',500,2,(error,pls)=>{
      if(error) cb(error);
      else cb(pls);
    });
  }
  }

  exports.searchHomes=searchHomes;
  