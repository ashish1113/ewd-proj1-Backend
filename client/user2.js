const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjVMaU5kVVlkRSIsImlhdCI6MTU1NTM2MDY4NDc2NywiZXhwIjoxNTU1NDQ3MDg0NzY3LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IjJ5RVVFbTAtdSIsInVzZXJOYW1lIjoicmFodWw1NjdAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoicmFodWwiLCJsYXN0TmFtZSI6InJhaSIsImVtYWlsIjoicmFodWw1NjdAZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjo5NDMxNTcyMDU3LCJ0eXBlT2ZVc2VyIjoiTm9ybWFsIiwiY291bnRyeSI6ImluZGlhIiwiY291bnRyeUNvZGUiOiI5MSJ9fQ.A9Y0KOZ-CESASFz0c1bbRxMT0Gc3wjsoKFuc9wqgoVc"
var userName = "parmatma-admin"
const userStatus ="admin"
var notificationFlag = false;
//const eventId = "zvq-yxsfR";
//const email
//var userNotificationdata ={userSocketId:socket.id,message:"you received a notification"}


let chatSocket = () => {

  socket.on('verifyUser', (data) => {

    console.log("socket trying to verify user");

   // console.log(socket)
    console.log("-------------------------------------------------------=========================------------------------------");
    

   console.log(socket.id)

    let userdata1 ={authToken:authToken,userSocketId:socket.id}

    socket.emit("set-user",userdata1);
    

    setInterval(function() {
     
      let userdata1 ={authToken:authToken,userSocketId:socket.id}
      socket.emit('notification1',userdata1);

      
    },1000*60);



  });

  
  if (userStatus === "admin"){
  socket.on("online-user-list", (data) => {
    
    console.log("Online user list is updated. some user can online or went offline")
    console.log("-------------------------------------------------------=========================------------------------------");
    console.log(data)
    console.log("-------------------------------------------------------=========================------------------------------");

    console.log(socket)
    
  });
}
else {
    console.log("you are a normal user")
    //let userdata1 ={authToken:authToken,userSocketId:socket.id}
    //socket.emit('notification1',userdata1);
}


 
 /* let userNotificationdata ={authToken:authToken,message:"you received a notification"}
  let userdata ={authToken:authToken,userSocketId:socket.id}
  socket.emit('notification',userNotificationdata);*/

  

  // let notification =(userdataAgu) => {
  // socket.emit('notification',userdataAgu);
  // }

  // let userdata ={authToken:authToken,userSocketId:socket.id}
  // socket.emit('notification',userdata);
  //setInterval(notification(userdata), 1000*60*60);
  //notification(userdata);
 
  socket.on("notification-send",(data1)=>{
   console.log(".,.,.,.,.,.,.------------------------------------------------------------------,.,.,.,,.,.,.,.")
   console.log(data1);
   console.log(".,.,.,.,.,.,.------------------------------------------------------------------,.,.,.,,.,.,.,.")
   $("#send").on('click', function () {
     data1.isSnooze =true;
    
     var snooze = setInterval(function() {
      let eventTime = new Date(data1.eventDetails.startTime);
         let timeNow = new Date()
         var c = 1
         
         if ((eventTime > timeNow))
         {
           console.log(data1);
           console.log(".,.,.,.,.,.,.------------------------------------------------------------------,.,.,.,,.,.,.,.")
           console.log(c)
           c=c+1;
         }
         else{
          console.log("exit");
          clearInterval(snooze);
         }
    
     },5000)
    

   })

  })

  

}

chatSocket();