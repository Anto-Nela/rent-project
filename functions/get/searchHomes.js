const users=require('../../schema/user');
const myError=require('../../error');

//searchi
function searchHomes(db,maxValue,minValue,rruga,nrdhoma,nrpersona,faqe,cb){

    minprice = parseInt(minValue, 10);
    maxprice = parseInt(maxValue, 10);
    dhoma = parseInt(nrdhoma, 10);
   persona = parseInt(nrpersona, 10);
   faqja= parseInt(faqe, 10);

  try{

    if(rruga==''&&dhoma==0&&persona==0){
      db.collection("homes").find(
        { price: { $gte: minprice, $lte: maxprice }
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
        
        else{
          var j=0;
          if(faqja%2==1){
            if(faqja==1){
              if(doc.length<16){
                cb(null, doc.slice(0,doc.length));
              }
              else {cb(null, doc.slice(0,16)); }
            }else{
              if(faqja*16<=doc.length){
                cb(null,doc.slice((faqja*16)-16,faqja*16));
              }else{
                cb(null,doc.slice((faqja*16)-16,doc.length));
              }
            }
          }else{
            if(faqja*16<=doc.length){
              cb(null,doc.slice((faqja*16)-16,faqja*16));
            }
            else{
              cb(null,doc.slice((faqja*16)-16,doc.length));
            }
          } 
        } 

      });
    }


    else if(rruga==''&&dhoma==0){
      db.collection("homes").find(
        { price: { $gte: minprice, $lte: maxprice },
        tenants: persona
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

        else{
          var j=0;
          if(faqja%2==1){
            if(faqja==1){
              if(doc.length<16){
                cb(null, doc.slice(0,doc.length));
              }
              else {cb(null, doc.slice(0,16)); }
            }else{
              if(faqja*16<=doc.length){
                cb(null,doc.slice((faqja*16)-16,faqja*16));
              }else{
                cb(null,doc.slice((faqja*16)-16,doc.length));
              }
            }
          }else{
            if(faqja*16<=doc.length){
              cb(null,doc.slice((faqja*16)-16,faqja*16));
            }
            else{
              cb(null,doc.slice((faqja*16)-16,doc.length));
            }
          } 
        } 

      });
    }

    else if(rruga==''&&persona==0){
      db.collection("homes").find(
        { price: { $gte: minprice, $lte: maxprice },
          rooms: dhoma
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
        
        else{
          var j=0;
          if(faqja%2==1){
            if(faqja==1){
              if(doc.length<16){
                cb(null, doc.slice(0,doc.length));
              }
              else {cb(null, doc.slice(0,16)); }
            }else{
              if(faqja*16<=doc.length){
                cb(null,doc.slice((faqja*16)-16,faqja*16));
              }else{
                cb(null,doc.slice((faqja*16)-16,doc.length));
              }
            }
          }else{
            if(faqja*16<=doc.length){
              cb(null,doc.slice((faqja*16)-16,faqja*16));
            }
            else{
              cb(null,doc.slice((faqja*16)-16,doc.length));
            }
          } 
        } 
      });

    }

//rasti kur useri ve personat (roommates) dhe dhomat 0
else if(persona==0&&dhoma==0){

      db.collection("homes").find(
        { 'adress.street': {'$regex' : '.*' + rruga + '.*'},
        price: { $gte: minprice, $lte: maxprice }
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

        else{
          var j=0;
          if(faqja%2==1){
            if(faqja==1){
              if(doc.length<16){
                cb(null, doc.slice(0,doc.length));
              }
              else {cb(null, doc.slice(0,16)); }
            }else{
              if(faqja*16<=doc.length){
                cb(null,doc.slice((faqja*16)-16,faqja*16));
              }else{
                cb(null,doc.slice((faqja*16)-16,doc.length));
              }
            }
          }else{
            if(faqja*16<=doc.length){
              cb(null,doc.slice((faqja*16)-16,faqja*16));
            }
            else{
              cb(null,doc.slice((faqja*16)-16,doc.length));
            }
          } 
        } 

      });
    }

    else if(rruga==''){

      db.collection("homes").find(
        { price: { $gte: minprice, $lte: maxprice },
            tenants: persona,
            rooms: dhoma
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
       
        else{
          var j=0;
          if(faqja%2==1){
            if(faqja==1){
              if(doc.length<16){
                cb(null, doc.slice(0,doc.length));
              }
              else {cb(null, doc.slice(0,16)); }
            }else{
              if(faqja*16<=doc.length){
                cb(null,doc.slice((faqja*16)-16,faqja*16));
              }else{
                cb(null,doc.slice((faqja*16)-16,doc.length));
              }
            }
          }else{
            if(faqja*16<=doc.length){
              cb(null,doc.slice((faqja*16)-16,faqja*16));
            }
            else{
              cb(null,doc.slice((faqja*16)-16,doc.length));
            }
          } 
        } 

      });
    }


    //rasti kur useri ve dhomat 0
   else if(dhoma==0){

      db.collection("homes").find(
        { 'adress.street': {'$regex' : '.*' + rruga + '.*'},
           price: { $gte: minprice, $lte: maxprice },
           tenants: persona
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
        
        else{
          var j=0;
          if(faqja%2==1){
            if(faqja==1){
              if(doc.length<16){
                cb(null, doc.slice(0,doc.length));
              }
              else {cb(null, doc.slice(0,16)); }
            }else{
              if(faqja*16<=doc.length){
                cb(null,doc.slice((faqja*16)-16,faqja*16));
              }else{
                cb(null,doc.slice((faqja*16)-16,doc.length));
              }
            }
          }else{
            if(faqja*16<=doc.length){
              cb(null,doc.slice((faqja*16)-16,faqja*16));
            }
            else{
              cb(null,doc.slice((faqja*16)-16,doc.length));
            }
          } 
        } 

      });
    }

    //rasti kur useri ve personat (roommates) 0
   else if(persona==0){

        db.collection("homes").find(
          { 'adress.street': {'$regex' : '.*' + rruga + '.*'},
          price: { $gte: minprice, $lte: maxprice },
          rooms: dhoma
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

          else{
            var j=0;
            if(faqja%2==1){
              if(faqja==1){
                if(doc.length<16){
                  cb(null, doc.slice(0,doc.length));
                }
                else {cb(null, doc.slice(0,16)); }
              }else{
                if(faqja*16<=doc.length){
                  cb(null,doc.slice((faqja*16)-16,faqja*16));
                }else{
                  cb(null,doc.slice((faqja*16)-16,doc.length));
                }
              }
            }else{
              if(faqja*16<=doc.length){
                cb(null,doc.slice((faqja*16)-16,faqja*16));
              }
              else{
                cb(null,doc.slice((faqja*16)-16,doc.length));
              }
            } 
          } 

        });
      }

    //kur useri ve dhoma dhe persona(roommates) me shum se 4 
     else if(dhoma==4 && persona==4){

      db.collection("homes").find(
        { 'adress.street': {'$regex' : '.*' + rruga + '.*'},
        price: { $gte: minprice, $lte: maxprice },
             tenants: {$gte:3},
             rooms: {$gte:3}
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

        else{
          var j=0;
          if(faqja%2==1){
            if(faqja==1){
              if(doc.length<16){
                cb(null, doc.slice(0,doc.length));
              }
              else {cb(null, doc.slice(0,16)); }
            }else{
              if(faqja*16<=doc.length){
                cb(null,doc.slice((faqja*16)-16,faqja*16));
              }else{
                cb(null,doc.slice((faqja*16)-16,doc.length));
              }
            }
          }else{
            if(faqja*16<=doc.length){
              cb(null,doc.slice((faqja*16)-16,faqja*16));
            }
            else{
              cb(null,doc.slice((faqja*16)-16,doc.length));
            }
          } 
        } 

      });
    }

      //kur useri ve dhomat me shum se 4
     else if(dhoma==4){

        db.collection("homes").find(
          { 'adress.street': {'$regex' : '.*' + rruga + '.*'},
              price: { $gte: minprice, $lte: maxprice },
              tenants: persona,
              rooms: {$gte:3}
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

          else{
            var j=0;
            if(faqja%2==1){
              if(faqja==1){
                if(doc.length<16){
                  cb(null, doc.slice(0,doc.length));
                }
                else {cb(null, doc.slice(0,16)); }
              }else{
                if(faqja*16<=doc.length){
                  cb(null,doc.slice((faqja*16)-16,faqja*16));
                }else{
                  cb(null,doc.slice((faqja*16)-16,doc.length));
                }
              }
            }else{
              if(faqja*16<=doc.length){
                cb(null,doc.slice((faqja*16)-16,faqja*16));
              }
              else{
                cb(null,doc.slice((faqja*16)-16,doc.length));
              }
            } 
          } 

        });
      }

     else if(persona==4){

        db.collection("homes").find(
          { 'adress.street': {'$regex' : '.*' + rruga + '.*'},
            price: { $gte: minprice, $lte: maxprice },
               tenants: {$gte:3},
               rooms: dhoma
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

          else{
            var j=0;
            if(faqja%2==1){
              if(faqja==1){
                if(doc.length<16){
                  cb(null, doc.slice(0,doc.length));
                }
                else {cb(null, doc.slice(0,16)); }
              }else{
                if(faqja*16<=doc.length){
                  cb(null,doc.slice((faqja*16)-16,faqja*16));
                }else{
                  cb(null,doc.slice((faqja*16)-16,doc.length));
                }
              }
            }else{
              if(faqja*16<=doc.length){
                cb(null,doc.slice((faqja*16)-16,faqja*16));
              }
              else{
                cb(null,doc.slice((faqja*16)-16,doc.length));
              }
            } 
          } 

        });
      }

    else{
     
      db.collection("homes").find(
      { 'adress.street': {'$regex' : '.*' + rruga + '.*'},
         price: { $gte: minprice, $lte: maxprice },
         rooms: dhoma,
          tenants: persona
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
      
      else{
        var j=0;
        if(faqja%2==1){
          if(faqja==1){
            if(doc.length<16){
              cb(null, doc.slice(0,doc.length));
            }
            else {cb(null, doc.slice(0,16)); }
          }else{
            if(faqja*16<=doc.length){
              cb(null,doc.slice((faqja*16)-16,faqja*16));
            }else{
              cb(null,doc.slice((faqja*16)-16,doc.length));
            }
          }
        }else{
          if(faqja*16<=doc.length){
            cb(null,doc.slice((faqja*16)-16,faqja*16));
          }
          else{
            cb(null,doc.slice((faqja*16)-16,doc.length));
          }
        } 
      } 
      
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
  