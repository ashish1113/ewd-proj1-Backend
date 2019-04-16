const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const tokenLib = require("./tokenLib.js");
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



let setServer = (server) => {

    let allOnlineUsers = []

    let io = socketio.listen(server);

    let myIo = io.of('/')

    myIo.on('connection', (socket) => {




        console.log("on connection--emitting verify user");

        socket.emit("verifyUser", "");


        socket.on('set-user', (data) => {

            console.log("set-user called")

            console.log(data);
            tokenLib.verifyClaimWithoutSecret(data.authToken, (err, user) => {
                if (err) {
                    socket.emit('auth-error', { status: 500, error: 'Please provide correct auth token' })
                }
                else {

                    console.log("user is verified..setting details");
                    let currentUser = user.data;
                    // setting socket user id 
                    socket.userName = currentUser.userName
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                    console.log(`${fullName} is online`);


                    let userObj = { userName: currentUser.userName, fullName: fullName, email: currentUser.email, userSocketId: data.userSocketId }
                    allOnlineUsers.push(userObj)
                    console.log(allOnlineUsers)

                    // setting room name
                    //socket.room = 'MP-INTERFACE'
                    // joining chat-group room.
                    // socket.join(socket.room)
                    // socket.to(socket.room).broadcast.emit('online-user-list',allOnlineUsers);
                    // myIo.in(socket.room).emit('online-user-list', allOnlineUsers); 
                    myIo.emit('online-user-list', allOnlineUsers); //sending to all clients, include sender
                    //socket.emit('online-user-list', allOnlineUsers);


                    //socket.to(socket.room).broadcast.emit('online-user-list',allOnlineUsers);
                }


            })

        }) // end of listening set-user event

        /*cron.schedule("* * * * *", function () {
            EventModel.find(function (err, res) {

                if (res) {
                    let eventArray = checkEvent.checkEventForTime(res);
                    console.log("eventsArray are:", eventArray);
                    console.log("===========================================================");

                    let eventTobeNotified = checkEvent.compareEmail(eventArray, allOnlineUsers)

                    console.log("events are:", eventTobeNotified);
                    if (eventTobeNotified.length > 0) {
                        for (let x = 0; x < eventTobeNotified.length; x++) {
                            myIo.to(`${eventTobeNotified[x].userSoketId}`).emit('notification-send', "your notification" + eventTobeNotified[x].userSoketId);
                        }

                    }

                }
                else {

                }

            });
        })*/


        socket.on('notification1',(userdata) => { 
            console.log("user data inside:",userdata);
            tokenLib.verifyClaimWithoutSecret(userdata.authToken, (err, user) => {
                if (user)
                {
                    EventModel.find({userEmail:user.data.email},function (err, res) {

                        if(res)
                        {   
                            //console.log("inside user:",res);
                            let eventArray = checkEvent.checkEventForTime(res);   
                            console.log("eventsArray are:", eventArray);
                    console.log("===========================================================");

                    if (eventArray.length > 0) {
                        for (let x = 0; x < eventArray.length; x++) {
                            myIo.to(`${userdata.userSocketId}`).emit('notification-send', "your notification" + eventArray[x].userEmail+"eventId="+eventArray[x].id);
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

            console.log("user is disconnected");
            // console.log(socket.connectorName);
            console.log(socket.userName);


            var removeIndex = allOnlineUsers.map(function (user) { return user.userName; }).indexOf(socket.userName);
            allOnlineUsers.splice(removeIndex, 1)
            console.log(allOnlineUsers)

            myIo.emit('online-user-list', allOnlineUsers);
            //io.in(socket.room).emit('online-user-list', allOnlineUsers); 
            // socket.to(socket.room).broadcast.emit('online-user-list',allOnlineUsers);
            // socket.leave(socket.room)







        }) // end of on disconnect






    })

}
module.exports = {
    setServer: setServer
}
