const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const tokenLib = require("./tokenLib.js");
const mailLib = require("./mailingLib.js")
const check = require("./checkLib.js");
const response = require('./responseLib')
const UserModel = mongoose.model('User')
const EventModel = mongoose.model('Event')

const moment = require('moment')
const momenttz = require('moment-timezone')
const timeZone = 'Asia/Calcutta'

const time = require('./timeLib');
const checkEvent = require('./checkEventLib')
const cron = require("node-cron");


let setServer = (server) => {

    let allNormalUserList = []
    var allOnlineUsers = []


    let io = socketio.listen(server);

    let myIo = io.of('/')

    myIo.on('connection', (socket) => {





        socket.emit("verifyUser", "");


        socket.on('set-user', (data) => {


            console.log("data passed to set-user event: ", data);
            tokenLib.verifyClaimWithoutSecret(data.authToken, (err, user) => {
                if (err) {
                    socket.emit('auth-error', { status: 500, error: 'Please provide correct auth token' })
                }
                else {

                    console.log("user data post success auth token verification: ", user);
                    let currentUser = user.data;
                    // setting socket user id 
                    socket.userName = currentUser.userName
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`

                    console.log(`${fullName} is online`);

                    let userObj = { userName: currentUser.userName, fullName: fullName, socketId: data.userSocketId }

                    var removeIndex = allOnlineUsers.map(function (user) { return user['userName']; }).indexOf(userObj.userName);
                    if (removeIndex == -1) {
                        allOnlineUsers.push(userObj);
                    }
                    console.log("online user list after successful set-user: ", allOnlineUsers)

                    myIo.emit('online-user-list', allOnlineUsers);




                }


            })

            UserModel.find({ typeOfUser: "Normal" }, function (err, res) {

                if (err) {

                    console.log("Some error occurred while searching for allNormalList", err)

                }
                else if (check.isEmpty(res)) {

                    console.log("No normal user found while searching for allNormalList", res)

                } else {
                    allNormalUserList = [];
                    for (let x in res) {
                        let fullName = `${res[x].firstName} ${res[x].lastName}`
                        let tempData = { "userName": res[x].userName, "email": res[x].email, "fullName": fullName }
                        allNormalUserList.push(tempData);

                    }
                }

            })




        }) // end of listening set-user event

        myIo.emit('all-Normal-user-list', allNormalUserList);




        socket.on('notification1', (userdata) => {
            console.log("user data inside:", userdata);
            tokenLib.verifyClaimWithoutSecret(userdata.authToken, (err, user) => {
                if (user) {
                    EventModel.find({ userEmail: user.data.email }, function (err, res) {

                        if (res) {
                            //console.log("inside user:",res);
                            let eventArray = checkEvent.checkEventForTime(res);


                            if (eventArray.length > 0) {
                                for (let x = 0; x < eventArray.length; x++) {

                                    let notificationObj = {
                                        notificationId: shortid.generate(),
                                        eventToOccurAt: eventArray[x].startTime,
                                        userEmail: eventArray[x].userEmail,
                                        eventDetails: eventArray[x],
                                        isSnooze: false
                                    }


                                    myIo.emit('notification-send', notificationObj);

                                }

                            }
                        }


                    })

                }



            });
        });






        socket.on('disconnect', () => {

            console.log("socket username on disconnect: ", socket.userName);

            if (socket.userName) {
                var removeIndex = allOnlineUsers.map(function (user) { return user['userName']; }).indexOf(socket.userName);
                console.log("removed index: ", removeIndex);
                allOnlineUsers.splice(removeIndex, 1)
            }

            console.log("updated online user list on disconnect: ", allOnlineUsers)

            myIo.emit('online-user-list', allOnlineUsers);









        }) // end of on disconnect



        socket.on('send-notification-on-event-create', (userdata) => {

            let notificationObjOnCreate = {
                notifiation_message: `Hey you have a new Event Created By The Admin`,
                userName: userdata
            }
            let socketIdTOSendMessage

            for (let x in allOnlineUsers) {
                if (allOnlineUsers[x].userName == userdata) {
                    socketIdTOSendMessage = allOnlineUsers[x].socketId;

                }


            }



            myIo.emit('notification-for-new-event', notificationObjOnCreate);



        })


        socket.on('send-notification-on-event-delete', (userdata) => {
            let notificationObjOnDelete = {
                notifiation_message: `Hey Oneof your event is deleted By The Admin`,
                userName: userdata
            }
            let socketIdTOSendMessage

            for (let x in allOnlineUsers) {
                if (allOnlineUsers[x].userName == userdata) {
                    socketIdTOSendMessage = allOnlineUsers[x].socketId;

                }


            }

            myIo.emit('notification-for-event-delete', notificationObjOnDelete);




        })


        socket.on('send-notification-on-event-edit', (userdata) => {
            let notificationObjOnEdit = {
                notifiation_message: `Hey you have a new Event Edited By The Admin`,
                userName: userdata
            }
            let socketIdTOSendMessage

            for (let x in allOnlineUsers) {
                if (allOnlineUsers[x].userName == userdata) {
                    socketIdTOSendMessage = allOnlineUsers[x].socketId;

                }


            }

            myIo.emit('notification-for-event-edit', notificationObjOnEdit);




        })


















    })

}
module.exports = {
    setServer: setServer
}
