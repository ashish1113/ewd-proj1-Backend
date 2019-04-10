const mongoose = require('mongoose')
const check = require('./../libs/checkLib')
const logger = require('./../libs/loggerLib')
const responseLib = require('./../libs/responseLib')
const User = mongoose.model("User")

let isAdmin = (req, res, next) => {
    if(req.user.isAdmin === true){

        User.findOne({ email:req.body.email }, (err, UserDetails) => { 
            if(err){
                console.log(err);
                  logger.error(err.message, ' Checked For admin status -> Checking for user email', 10);
                  let apiResponse = responseLib.generate(true, 'Failed To Check User-email For Admin', 500, null);
                  res.send(apiResponse)
            }
            else if (check.isEmpty(UserDetails)) {
                logger.error('No Such User Found while checking for email','Checked For admin status -> Checking for user email', 10)
                let apiResponse = responseLib.generate(true, 'User Not Found', 404, null)
                res.send(apiResponse)

            }else{
                logger.info('------email entered belong to some user------','Checked For admin status -> Checking for user email', 10) ;
                console.log('------email entered belong to some user------');
                next()

            }
        })

        
        
    }else{
        console.log("You are not allowed for the action --contact--admin");
                  logger.error("You are not allowed for the action --contact--admin", 'Authorization Middleware -> Checking For CheckAdmin Middleware', 7);
                  let apiResponse = responseLib.generate(true, 'Not Allowed for the Actions ahead', 401, null);
                  res.send(apiResponse)
    }
}

module.exports = {
    isAdmin: isAdmin
  }
  