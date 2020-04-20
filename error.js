class myError{
    constructor(message,code) {
      this.message=message;
      this.statusCode = code;
     Error.captureStackTrace(this, myError);
    }
    message(){
        return this.message;
    }
    statusCode(){
        return this.statusCode;
    }
    
  }

module.exports=myError;