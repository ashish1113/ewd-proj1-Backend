const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')
const AuthModel = mongoose.model('Auth')
const EventModel = mongoose.model('Event')

let eventCreator = (req, res) => {

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
                startTime: time.addHoursToDay(req.body.startDate, startFullTimeDetails),
                endTime: time.addHoursToDay(req.body.endDate, endFullTimeDetails),
                EventDurationInHours: eventDurationInHrs,
                eventLocation: req.body.eventLocation,
                eventDescription: req.body.eventDescription
                //normalTime:time.getLocalTime(newEvent.startTime)
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
                    console.log("normalstarttime:" + newEventObj.startTime)
                    console.log("normalendtime:" + newEventObj.endTime)
                    console.log("total duration" + newEventObj.EventDurationInHours);
                }
            })
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
    }// end create user function


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
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Event Controller: getSingleUserEvents', 10)
                let apiResponse = response.generate(true, 'Failed To Find Events Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Event Found', 'Event Controller:getSingleUserEvents')
                let apiResponse = response.generate(true, 'No Event Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Events Details Found', 200, result)
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
            res.send(apiResponse)
        }
    });// end event model update


}// end edit event

//start of delete event func

let deleteEvent = (req, res) => {

    EventModel.findOneAndRemove({ 'eventId': req.params.eventId }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Event Controller: deleteEvent', 10)
            let apiResponse = response.generate(true, 'Failed To delete event', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Event Found', 'Event Controller: deleteEvent')
            let apiResponse = response.generate(true, 'No Event Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the event successfully', 200, result)
            res.send(apiResponse)
        }
    });// end event model find and remove


}// end delete event

module.exports = {
    eventCreator: eventCreator,
    getSingleUserEvents: getSingleUserEvents,
    editEvent:editEvent,
    deleteEvent: deleteEvent
}