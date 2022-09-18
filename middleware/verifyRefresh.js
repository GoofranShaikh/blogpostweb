const jwt = require("jsonwebtoken");
const config = process.env;
function verifyRefreshToken(email,token){
    try{
      const decodedToken = jwt.verify(token,config.REFRESH_TOKEN)
      return decodedToken.email== email? true:false
    }
    catch(err){
      res.send(err)
    }
    }

    module.exports=verifyRefreshToken