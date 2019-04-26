const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const mailingLib = require("./../libs/mailingLib")
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')
const AuthModel = mongoose.model('Auth')
const EventModel = mongoose.model('Event')
const events = require('events');
const eventEmitter = new events.EventEmitter();

const checkEvent = require('./../libs/checkEventLib')
const cron = require("node-cron");


let eventCreator = (req, res) => {
    console.log("create event request body: ",req.body);
    let validateEventInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Email Does not met the requirement', 400, null)
                    reject(apiResponse)
                }
                else {
                    resolve(req)
                }
            } else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate event input
    let createEvent = () => {
        return new Promise((resolve, reject) => {

            var startFullTimeDetails = time.timeMinutesHourSetter(req.body.startHours, req.body.startMins);
            let hourDiffBetweenDays = time.checkEndDateAndHour(req.body.startDate, req.body.endDate);
            let endFullTimeDetails = time.timeMinutesHourSetter(req.body.endHours, req.body.endMins);
            let eventDurationInHrs = (hourDiffBetweenDays - startFullTimeDetails) + endFullTimeDetails;
            let newEvent = new EventModel({

                userEmail: req.body.email.toLowerCase(),
                eventTitle: req.body.eventTitle,
                eventId: shortid.generate(),
                userMobileNumber: req.body.userMobileNumber,
                createdOn: time.now(),
                createdBy:req.body.createdBy,
                startTime: time.addHoursToDay(req.body.startDate, startFullTimeDetails),
                endTime: time.addHoursToDay(req.body.endDate, endFullTimeDetails),
                EventDurationInHours: eventDurationInHrs,
                eventLocation: req.body.eventLocation,
                eventDescription: req.body.eventDescription
                //normalTime:time.getLocalTime(newEvent.startTime)
            })

            if(new Date(newEvent.startTime) > new Date()){
            newEvent.save((err, newEvent) => {
                if (err) {
                    console.log("error while saving event: ",err)
                    logger.error(err.message, 'EventController: createUser', 10)
                    let apiResponse = response.generate(true, 'Failed to create new event', 500, null)
                    reject(apiResponse)
                } else {
                    let newEventObj = newEvent.toObject();
                    eventEmitter.emit("new-event-created",newEventObj);
                    resolve(newEventObj)
                    console.log("normalstarttime:" + newEventObj.startTime)
                    console.log("normalendtime:" + newEventObj.endTime)
                    console.log("total duration" + newEventObj.EventDurationInHours);
                }
            })

        }
        else{
            logger.error("Check Start Time ", 'EventController: createEvent', 10)
                    let apiResponse = response.generate(true, 'Failed to create new event-as the time is not valid', 500, null)
                    reject(apiResponse)

        }
            /*EventModel.findOne({ userEmail: req.body.email })
                .exec((err, retrievedEventsDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Failed To Create Event', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedEventsDetails)) {
                        console.log(req.body)
                        let newEvent = new EventModel({
                            
                            userEmail: req.body.email.toLowerCase(),
                            eventTitle: req.body.eventTitle,
                            
                        })
                        newEvent.save((err, newEvent) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'EventController: createUser', 10)
                                let apiResponse = response.generate(true, 'Failed to create new event', 500, null)
                                reject(apiResponse)
                            } else {
                                let newEventObj = newEvent.toObject();
                                resolve(newEventObj)
                            }
                        })
                    } else {
                        logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                        let apiResponse = response.generate(true, 'User Already Present With this Email', 403, null)
                        reject(apiResponse)
                    }
                })*/
        })

    //     // eventEmitter.on("new-event-created",(eventData)=>{
    //     //     let message = `your event eith (eventid:-${eventData.eventId})is created at ${eventData.createdOn}`;
    //     //     let emailToSend = eventData.userEmail
    //     //     mailingLib.sendMail(emailToSend,message)

    // })
    }// end create user function
    
    eventEmitter.on("new-event-created",(eventData)=>{
        let message = `your event eith (eventid:-${eventData.eventId})is created at ${eventData.createdOn}`;
        let emailToSend = eventData.userEmail
        mailingLib.sendMail(emailToSend,message)

    })


    validateEventInput(req, res)
        .then(createEvent)
        .then((resolve) => {

            let apiResponse = response.generate(false, 'Event created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end event creator function 


let getSingleUserEvents = (req, res) => {
    EventModel.find({ 'userEmail': req.params.email })
        .select('-__v -_id')
        
        .exec((err, result) => {
            console.log("req--------------------------------------------",req.params.email)
            if (err) {
                console.log(err)
                logger.error(err.message, 'Event Controller: getSingleUserEvents', 10)
                let apiResponse = response.generate(true, 'Failed To Find Events Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Event Found', 'Event Controller:getSingleUserEvents')
                let apiResponse = response.generate(true, 'No Event Found 1', 404, null)
                
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Events Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get single user events

let getSingleEventDetails = (req, res) => {
    EventModel.findOne({ 'eventId': req.params.currentEventId })
        .select('-__v -_id')
        
        .exec((err, result) => {
            console.log("req--------------------------------------------",req.params.currentEventId)
            if (err) {
                console.log(err)
                logger.error(err.message, 'Event Controller: getSingleEventDetails', 10)
                let apiResponse = response.generate(true, 'Failed To Find Event Details of given eventid', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Event-Details Found', 'Event Controller:getSingleEventDetails')
                let apiResponse = response.generate(true, 'No Event Details Found ', 404, null)
                
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Event Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get single user events

let editEvent = (req, res) => {

    let options = req.body;
    EventModel.update({ 'eventId': req.params.eventId }, options).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Event Controller:editEvent', 10)
            let apiResponse = response.generate(true, 'Failed To edit event details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Event Found', 'Event Controller:editEvent')
            let apiResponse = response.generate(true, 'No Event Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Event details edited', 200, result)
            eventEmitter.emit("event-edited",req.params.eventId);
            res.send(apiResponse)
        }
    });// end event model update

    eventEmitter.on("event-edited",(data)=>
    {    console.log("data in edited event----------------",data);
        EventModel.find({ 'eventId': data },(err,result)=>{
              console.log("result in event -edited********8",result)

              if (err) {
                console.log("unable to send mail due to some error",err)
                // logger.error(err.message, 'Event Controller:editEvent', 10)
                // let apiResponse = response.generate(true, 'Failed To edit event details', 500, null)
                // res.send(apiResponse)
            }
            else if (check.isEmpty(result)) {
               console.log("Details not found to send mail ",result)
            }
            else
            {
                let message = `some modification is done with your event with following Detalis :-
                ${result}`
                let emailToSendOnEditing = result[0].userEmail;
                console.log(result)

                console.log(emailToSendOnEditing)
                mailingLib.sendMail(emailToSendOnEditing,message)

            }
        })

    });

}// end edit event


//start of delete event func

let deleteEvent = (req, res) => {


    EventModel.findOneAndRemove({ 'eventId': req.params.eventId }).exec((err, result) => {
        if (err) {
            console.log("mongo",err)
            logger.error(err.message, 'Event Controller: deleteEvent', 10)
            let apiResponse = response.generate(true, 'Failed To delete event', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Event Found', 'Event Controller: deleteEvent')
            let apiResponse = response.generate(true, 'No Event Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the event successfully', 200, result)
            console.log("result-on-delete",result)
            eventEmitter.emit("event-deleted",result.userEmail);
            res.send(apiResponse)
        }
    });// end event model find and remove

    eventEmitter.on("event-deleted",(data)=>
    {
        // EventModel.find({ 'eventId': data },(err,result)=>{
        //     if(result)
        //     {
        //         let message = `an event with ${data} is deleted`
        //         let emailToSendOnDeleting = result[0].userEmail;
        //         mailingLib.sendMail(emailToSendOnDeleting,message)

        //     }


    //     })
               let message = `an event of  ${data} is deleted`
               let emailToSendOnDeleting = data;
               mailingLib.sendMail(emailToSendOnDeleting,message)

     });

}// end delete event


cron.schedule("* * * * *", function () {
    EventModel.find(function (err, res) {

        if (res) {
            let eventArray = checkEvent.checkEventForTime(res);
            for (let x =0 ;x < eventArray.length ;x++ )
            {
                let message = {
                    eventId : eventArray[x].eventId,
                    eventTitle:eventArray[x].eventTitle,
                    eventStartTime:eventArray[x].startTime,
                    eventLocation:eventArray[x].eventLocation,
                    eventCreator:eventArray[x].eventCreator
                   
                    
                    
                }
                let messageTobeSend = `this is an notification mail for an event coming soon for details refer to the following:
                ${message} `;
                let email = eventArray[x].userEmail;
                mailingLib.sendMail(email,messageTobeSend);
            }

        }
        else {

        }

    });
})



module.exports = {
    eventCreator: eventCreator,
    getSingleUserEvents: getSingleUserEvents,
    editEvent:editEvent,
    deleteEvent: deleteEvent,
    getSingleEventDetails : getSingleEventDetails
}