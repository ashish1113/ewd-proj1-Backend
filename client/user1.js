const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InVTY1MyYzRHZyIsImlhdCI6MTU1NTM2MDc2ODYwMSwiZXhwIjoxNTU1NDQ3MTY4NjAxLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IjJ5RVVFbTAtdSIsInVzZXJOYW1lIjoicmFodWw1NjdAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoicmFodWwiLCJsYXN0TmFtZSI6InJhaSIsImVtYWlsIjoicmFodWw1NjdAZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjo5NDMxNTcyMDU3LCJ0eXBlT2ZVc2VyIjoiTm9ybWFsIiwiY291bnRyeSI6ImluZGlhIiwiY291bnRyeUNvZGUiOiI5MSJ9fQ.rdtHa34etWelESaQNoiZkoQipknEh4ApclDBWv_lIyY"
const userName = "rahul567@gmail.com"
const userStatus ="normal"
let chatSocket = () => {

  socket.on('verifyUser', (data) => {

    console.log("socket trying to verify user");

   // console.log(socket)
    console.log("-------------------------------------------------------=========================------------------------------");
    

   console.log(socket.id)

    let userdata1 ={authToken:authToken,userSocketId:socket.id}

    socket.emit("set-user",userdata1);
    
    socket.emit('notification1',userdata1);
    //setInterval(socket.emit('notification1',userdata1), 1000);
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

/*socket.on("online-user-list", (data) => {
    
    console.log("Online user list is updated. some user can online or went offline")
    console.log("-------------------------------------------------------=========================------------------------------");

    console.log(socket.id)
    console.log(data)

  });*/
 
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
   console.log(".,.,.,.,.,.,.,.,.,.,,.,.,.,.")
   console.log(data1);
  })

  // $("#send").on('click', function () {

  //   //let userNotificationdata ={authToken:authToken,message:"you received a notification"}
  //   /*let userdata ={authToken:authToken,userSocketId:socket.id,message:"you received a notification"}
  // socket.emit('notification',userdata);*/
     
  
  // notificationFlag = true;

  //    if (notificationFlag === true){
  //     let userdata ={authToken:authToken,userSocketId:socket.id,message:"you received a notification"}
  //     //socket.emit('Event-notification',userdata);
  //    // notificationFlag = false;
  //   }
  
  // })

  

}

chatSocket();