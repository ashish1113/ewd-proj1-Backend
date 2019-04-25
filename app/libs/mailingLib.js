const nodemailer = require("nodemailer")

 async function sendMail1(email,message,htmlMessage) {
    
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass // generated ethereal password
        }
      });

      let info = await transporter.sendMail({
        from: 'Admin@proj', // sender address
        to:email, // list of receivers
        subject: "Follow the link to reset your password", // Subject line
        text: message,
        html: htmlMessage // html body
      });

      console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
     console.log("inside nodemailer function")
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      let linkMessage = message;

      return linkMessage;
     
}


async function sendMail(email,message) {
    
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass // generated ethereal password
        }
      });

      let info = await transporter.sendMail({
        from: 'Admin@proj', // sender address
        to:email, // list of receivers
        subject: "Follow the link to reset your password", // Subject line
        text: message,
        html: "<b>follow the link below to resset password <br/> </b><a>http://'  " // html body
      });

      console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      let linkMessage = message;

      return linkMessage;

}



module.exports = {
    sendMail: sendMail,
    sendMail1:sendMail1

}
