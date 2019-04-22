const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const tokenLib = require("./tokenLib.js");
const mailLib =require("./mailingLib.js")
const check = require("./checkLib.js");
const response = require('./responseLib')

const EventModel = mongoose.model('Event')
//const redisLib = require("./redisLib.js");
//for time
const moment = require('moment')
const momenttz = require('moment-timezone')
const timeZone = 'Asia/Calcutta'

const time = require('./timeLib');
const checkEvent = require('./checkEventLib')
const cron = require("node-cron");
//const redisLib = require("./redisLib.js");


let setServer = (server) => {

    let allOnlineUsers = []

    let io = socketio.listen(server);

    let myIo = io.of('/')

    myIo.on('connection', (socket) => {




        //console.log("on connection--emitting verify user");

        socket.emit("verifyUser", "");


        socket.on('set-user', (data) => {

            //console.log("set-user called")

            //console.log("data passed to set-user event: ",data);
            tokenLib.verifyClaimWithoutSecret(data.authToken, (err, user) => {
                if (err) {
                    socket.emit('auth-error', { status: 500, error: 'Please provide correct auth token' })
                }
                else {

                    //console.log("user is verified..setting details");
                    console.log("user data post success auth token verification: ",user);
                    let currentUser = user.data;
                    // setting socket user id 
                    socket.userName = currentUser.userName
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                    // let key = currentUser.userName
                    // let value = fullName
                    console.log(`${fullName} is online`);

                    //let userExists=false;
                    let userObj = { userName: currentUser.userName, fullName: fullName }
                    // if(allOnlineUsers.length>0){
                    //     for(let x in allOnlineUsers)
                    //     {
                    //         console.log("onlineuser listusername: ",allOnlineUsers[x].userName)
                    //         console.log("userobj username: ",userObj.userName);
                    //         if(allOnlineUsers[x].userName == userObj.userName)
                    //         {
                    //             console.log("I came here");
                    //             break;
                    //         }
                    //         else{
                    //             allOnlineUsers.push(userObj);
                    //         }
                    //     }
                    // }
                    
                    // else{
                    //     allOnlineUsers.push(userObj)
                    // }
                    var removeIndex = allOnlineUsers.map(function (user) { return user['userName']; }).indexOf(userObj.userName);
                    if(removeIndex==-1){
                        allOnlineUsers.push(userObj);
                    }
                      //allOnlineUsers.push(userObj)
                     console.log("online user list after successful set-user: ",allOnlineUsers)

                     myIo.emit('online-user-list', allOnlineUsers);



                    // let setUserOnline = redisLib.setANewOnlineUserInHash("onlineUsers", key, value, (err, result) => {
                    //     if (err) {
                    //         console.log(`some error occurred`)
                    //     } else {
                    //         // getting online users list.

                    //         redisLib.getAllUsersInAHash('onlineUsers', (err, result) => {
                    //             console.log(`--- inside getAllUsersInAHas function ---`)
                    //             if (err) {
                    //                 console.log(err)
                    //             } else {
                    //                 console.log("*********************************************")
                    //                 console.log(result);
                    //                 console.log("*********************************************")
                    //                 // setting room name
                    //                 socket.room = 'edChat'
                    //                 // joining chat-group room.
                    //                 socket.join(socket.room)
                    //                 socket.to(socket.room).broadcast.emit('online-user-list', result);
                    //                 // myIo.emit('online-user-list', result);


                    //             }
                    //         })
                    //     }
                    // })


                    // let userObj = { userName: currentUser.userName, fullName: fullName }
                    // allOnlineUsers.push(userObj)
                    // console.log(allOnlineUsers)

                    // // setting room name
                    // //socket.room = 'MP-INTERFACE'
                    // // joining chat-group room.
                    // // socket.join(socket.room)
                    // // socket.to(socket.room).broadcast.emit('online-user-list',allOnlineUsers);
                    // // myIo.in(socket.room).emit('online-user-list', allOnlineUsers); 
                    // myIo.emit('online-user-list', allOnlineUsers); //sending to all clients, include sender
                    // //socket.emit('online-user-list', allOnlineUsers);


                    //socket.to(socket.room).broadcast.emit('online-user-list',allOnlineUsers);
                }


            })
            // console.log("-----------------------------------------")
            // console.log(allOnlineUsers);

        }) // end of listening set-user event

        // cron.schedule("* * * * *", function () {
        //     EventModel.find(function (err, res) {

        //         if (res) {
        //             let eventArray = checkEvent.checkEventForTime(res);
        //             for (let x =0 ;x < eventArray.length ;x++ )
        //             {
        //                 let message = {
        //                     eventDetails : eventArray[x]
                            
        //                 }
        //                 let messageTobeSend = `this is an notification mail for an event coming soon for details refer to the following:
        //                 ${message} `;
        //                 let email = eventArray[x].userEmail;
        //                 mailingLib.sendMail(email,messageTobeSend);
        //             }

        //         }
        //         else {

        //         }

        //     });
        // })


        socket.on('notification1', (userdata) => {
            console.log("user data inside:", userdata);
            tokenLib.verifyClaimWithoutSecret(userdata.authToken, (err, user) => {
                if (user) {
                    EventModel.find({ userEmail: user.data.email }, function (err, res) {

                        if (res) {
                            //console.log("inside user:",res);
                            let eventArray = checkEvent.checkEventForTime(res);
                            console.log("eventsArray are:", eventArray);
                            console.log("===========================================================");

                            if (eventArray.length > 0) {
                                for (let x = 0; x < eventArray.length; x++) {

                                    let notificationObj = {
                                        notificationId: shortid.generate(),
                                        eventToOccurAt: eventArray[x].startTime,
                                        userEmail: eventArray[x].userEmail,
                                        eventDetails: eventArray[x],
                                        isSnooze :false
                                    }

                                    // setTimeout(function () {

                                    //     eventEmitter.emit('send-email', user.data);
                        
                                    // }, 2000)

                                    myIo.to(`${userdata.userSocketId}`).emit('notification-send',  notificationObj);
                                    
                                }

                            }
                        }


                    })

                }



            });
        });






        socket.on('disconnect', () => {
            // disconnect the user from socket
            // remove the user from online list
            // unsubscribe the user from his own channel

            //console.log("user is disconnected");
            // console.log(socket.connectorName);
            console.log("socket username on disconnect: ",socket.userName);

            if(socket.userName){
                var removeIndex = allOnlineUsers.map(function (user) { return user['userName']; }).indexOf(socket.userName);
                console.log("removed index: ",removeIndex);
                allOnlineUsers.splice(removeIndex, 1)
            }
             
            console.log("updated online user list on disconnect: ",allOnlineUsers)

            myIo.emit('online-user-list', allOnlineUsers);
            // //io.in(socket.room).emit('online-user-list', allOnlineUsers); 
            // socket.to(socket.room).broadcast.emit('online-user-list',allOnlineUsers);
            // socket.leave(socket.room)


            // if (socket.userName) {
            //     redisLib.deleteUserFromHash('onlineUsers', socket.userName)
            //     redisLib.getAllUsersInAHash('onlineUsers', (err, result) => {
            //         if (err) {
            //             console.log(err)
            //         } else {
            //              socket.leave(socket.room)
            //              socket.to(socket.room).broadcast.emit('online-user-list', result);
            //             //myIo.emit('online-user-list', result);

            //         }
            //     })
            // }








        }) // end of on disconnect






    })

}
module.exports = {
    setServer: setServer
}
