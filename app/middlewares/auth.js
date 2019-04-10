const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require("request")
const Auth = mongoose.model('Auth')
const User = mongoose.model("User")

const logger = require('./../libs/loggerLib')
const responseLib = require('./../libs/responseLib')
const token = require('./../libs/tokenLib')
const check = require('./../libs/checkLib')

let isAuthorized = (req, res, next) => {
  

  if (req.params.authToken || req.query.authToken || req.body.authToken || req.header('authToken')) {
    Auth.findOne({authToken: req.header('authToken') || req.params.authToken || req.body.authToken || req.query.authToken}, (err, authDetails) => {
      if (err) {
        console.log(err)
        logger.error(err.message, 'AuthorizationMiddleware', 10)
        let apiResponse = responseLib.generate(true, 'Failed To Authorized', 500, null)
        res.send(apiResponse)
      } else if (check.isEmpty(authDetails)) {
        logger.error('No AuthorizationKey Is Present', 'AuthorizationMiddleware', 10)
        let apiResponse = responseLib.generate(true, 'Invalid Or Expired AuthorizationKey', 404, null)
        res.send(apiResponse)
      } else {
        console.log(authDetails+"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        token.verifyToken(authDetails.authToken,authDetails.tokenSecret,(err,decoded)=>{

            if(err){
                logger.error(err.message, 'Authorization Middleware', 10)
                let apiResponse = responseLib.generate(true, 'Failed To Authorized', 500, null)
                res.send(apiResponse)
            }
            else{
                
              User.findOne({ userId: decoded.data.userId }, (err, authUserDetails) => {

                if (err) {
                  console.log(err);
                  logger.error(err.message, 'Authorization Middleware -> Checking For admin status', 10);
                  let apiResponse = responseLib.generate(true, 'Failed To Check User For Admin', 500, null);
                  res.send(apiResponse)
                } else if (check.isEmpty(authUserDetails)) {
                  logger.error('No UserDetailPresent', 'Authorization Middleware -> Checking For admin status', 10)
                  let apiResponse = responseLib.generate(true, 'Invalid or Empty User Details', 404, null)
                  res.send(apiResponse)
  
                } else {
                  if (authUserDetails.typeOfUser === "Admin") {
                    req.user = { userId: decoded.data.userId, isAdmin: true }
                    next()
                  }
                  else {
                    req.user = { userId: decoded.data.userId, isAdmin: false };
                    next()
                  }
                  console.log(req.user);
                }
              })
            }


        });// end verify token
       
      }
    })
  } else {
    logger.error('AuthorizationToken Missing', 'AuthorizationMiddleware', 5)
    let apiResponse = responseLib.generate(true, 'AuthorizationToken Is Missing In Request', 400, null)
    res.send(apiResponse)
  }
}


module.exports = {
  isAuthorized: isAuthorized
}
