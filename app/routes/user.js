const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const eventController = require("./../../app/controllers/eventController")
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')
const checkAdmin = require('./../middlewares/checkAdmin')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    


    // params: firstName, lastName, email, mobileNumber, password
    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup api for user signup.
     *
     * @apiParam {string} firstName firstName of the user. (body params) (required)
     * @apiParam {string} lastName lastName of the user. (body params) (required)
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {number} mobileNumber mobileNumber of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiParam {string} country country of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "User created",
            "status": 200,
            "data": {
                "userId": "5IjxA4NXq",
                "userName": "manu123@gmail.com",
                "firstName": "manu",
                "lastName": "rai",
                "email": "manu123@gmail.com",
                "mobileNumber": 9431562056,
                "createdOn": "2019-04-11T07:50:55.000Z",
                "typeOfUser": "Normal",
                "_id": "5caef1df8ac5b642b5a16316",
                "country": "india",
                "countryCode": "91",
                "__v": 0
               
            }

        }
    */

    // params: email, password.
    app.post(`${baseUrl}/login`, userController.loginFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImxKc2V1V3p5LSIsImlhdCI6MTU1NDk4MjE1MTczOCwiZXhwIjoxNTU1MDY4NTUxLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6InV5UTQxVkVSXyIsInVzZXJOYW1lIjoibWFudXJhaUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJtYW51IiwibGFzdE5hbWUiOiJyYWkiLCJlbWFpbCI6Im1hbnVyYWlAZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjo5NDMxNTYyMDU2LCJ0eXBlT2ZVc2VyIjoiTm9ybWFsIiwiY291bnRyeSI6ImluZGlhIiwiY291bnRyeUNvZGUiOiI5MSJ9fQ.Kw0-0f8GGKnWgGAxGJ-9csTXG7wTPygeRTxww8pf1l8",
                "userDetails": {
                    "userId": "uyQ41VER_",
                    "userName": "manurai@gmail.com",
                    "firstName": "manu",
                    "lastName": "rai",
                    "email": "manurai@gmail.com",
                    "mobileNumber": 9431562056,
                    "typeOfUser": "Normal",
                    "country": "india",
                    "countryCode": "91"
                }
            }

        }
    */

    // auth token params: userId.
    app.post(`${baseUrl}/logout`,auth.isAuthorized, userController.logout);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout to logout user.
     *
     * @apiParam {string} userId userId of the user. (auth headers) (required)
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null

        }
    */

    //for forgot password
    // params: email.
    app.post(`${baseUrl}/forgot/password`, userController.forgotPassword);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/forgot/password to recover forgot password.
     * 
     * @apiParam {string} email email of the user. (body params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     *   {
            "error": false,
            "message": "mail-sent successfully",
            "status": 200,
            "data": {
                "userId": "uyQ41VER_",
                "userName": "manurai@gmail.com",
                "firstName": "manu",
                "lastName": "rai",
                "password": "8659c6c0d2d71d1beeaf7d7b398cea98",
                "email": "manurai@gmail.com",
                "mobileNumber": 9431562056,
                "createdOn": "2019-04-11T11:24:30.000Z",
                "typeOfUser": "Normal",
                "_id": "5caf23eebaccff1e25868797",
                "country": "india",
                "countryCode": "91",
                "__v": 0,
                "resetPasswordToken": "SDCye-kQl",
                "resetPasswordExpires": "2019-04-11T18:37:43.311Z"
            }
        }
     * 
    */

    // params: newpassword.
    app.post(`${baseUrl}/reset/:token`,userController.resetPassword);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/reset/:token to reset new password.
     * 
     * @apiParam {string} newPassword newPassword of the user. (body params) (required).
     * @apiParam {string} token resetPasswordToken generated in forgot password. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
            "error": false,
            "message": "mail sent successfully after reset-password.",
            "status": 200,
            "data": null
        }
     * 
    */
//------------------------------------------from here event routes starrt-------------------------------------------------------------------------------
    //to create event

    // params: email, eventTitle, userMobileNumber, startDate, endDate, eventLocation, eventDescription, startHours, startMins, endHours, endMins, authToken.
    app.post(`${baseUrl}/create/event`,auth.isAuthorized,checkAdmin.isAdmin, eventController.eventCreator);
    /**
     * 
     * @apiGroup events
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/create/event to create new event.
     * 
     * @apiParam {string} email email of the user. (body params) (required).
     * @apiParam {string} eventTitle eventTitle of the user. (body params) (required).
     * @apiParam {number} userMobileNumber userMobileNumber of the user. (body params) (required).
     * @apiParam {Date} startDate startDate of the user. (body params) (required).
     * @apiParam {Date} endDate endDate of the user. (body params) (required).
     * @apiParam {string} eventLocation eventLocation of the user. (body params) (required).
     * @apiParam {string} eventDescription eventDescription of the user. (body params) (required).
     * @apiParam {number} startHours startHours of the user. (body params) (required).
     * @apiParam {number} startMins startMins of the user. (body params) (required).
     * @apiParam {number} endHours endHours of the user. (body params) (required).
     * @apiParam {number} endMins endMins of the user. (body params) (required).
     * @apiParam {string} authToken authToken of the admin. (body params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
            "error": false,
            "message": "Event created",
            "status": 200,
            "data": {
                "eventId": "nqXaCaU8D",
                "userMobileNumber": 9431562056,
                "createdOn": "2019-04-25T17:53:23.000Z",
                "createdBy": "Admin",
                "eventTitle": "meeting of rahul",
                "eventLocation": "ranchi",
                "eventDescription": "description about meeting 1",
                "notificationToken": true,
                "_id": "5cc1f4131b253a1698c8b242",
                "userEmail": "rahul1@gmail.com",
                "startTime": "2019-04-26T05:00:00.000Z",
                "endTime": "2019-04-26T07:00:00.000Z",
                "EventDurationInHours": 2,
                "__v": 0
            }
        }
     * 
     */
    
    //params: email,authToken.
    app.get(`${baseUrl}/:email/details/allEvents`,auth.isAuthorized,eventController.getSingleUserEvents);
    /**
     * 
     * @apiGroup events
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/:email/details/allEvents to get all events of a user .
     * 
     * @apiParam {string} email email of the user. (query params) (required).
     * @apiParam {string} authToken authToken of the admin. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "Events Details Found",
            "status": 200,
            "data": [
                {
                    "eventId": "xdwmZUHma",
                    "userMobileNumber": 0,
                    "createdOn": "2019-04-25T12:02:04.000Z",
                    "createdBy": "Admin",
                    "eventTitle": "meeting planning for satu",
                    "eventLocation": "ranchi",
                    "eventDescription": "description about meeting 1",
                    "notificationToken": true,
                    "userEmail": "satu@gmail.com",
                    "startTime": "2019-04-25T12:04:00.000Z",
                    "endTime": "2019-04-25T12:10:00.000Z",
                    "EventDurationInHours": 0.10000000000000142
                },
                {
                    "eventId": "r-fQqXe06",
                    "userMobileNumber": 0,
                    "createdOn": "2019-04-25T12:09:46.000Z",
                    "createdBy": "Admin",
                    "eventTitle": "meeting with satu",
                    "eventLocation": "ranchi",
                    "eventDescription": "d",
                    "notificationToken": true,
                    "userEmail": "satu@gmail.com",
                    "startTime": "2019-04-25T12:12:00.000Z",
                    "endTime": "2019-04-25T12:15:00.000Z",
                    "EventDurationInHours": 0.05000000000000071
                }
                
            ]
        }
     *   
     */


    //params: currentEventId,authToken.
    app.get(`${baseUrl}/read/:currentEventId/Details`,auth.isAuthorized,eventController.getSingleEventDetails);
    /**
     * 
     * @apiGroup events
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/read/:currentEventId/Details to get an event of a user .
     * 
     * @apiParam {string} currentEventId currentEventId of the event. (query params) (required).
     * @apiParam {string} authToken authToken of the admin. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
            "error": false,
            "message": "Event Details Found",
            "status": 200,
            "data": {
                "eventId": "xdwmZUHma",
                "userMobileNumber": 0,
                "createdOn": "2019-04-25T12:02:04.000Z",
                "createdBy": "Admin",
                "eventTitle": "meeting planning for satu",
                "eventLocation": "ranchi",
                "eventDescription": "description about meeting 1",
                "notificationToken": true,
                "userEmail": "satu@gmail.com",
                "startTime": "2019-04-25T12:04:00.000Z",
                "endTime": "2019-04-25T12:10:00.000Z",
                "EventDurationInHours": 0.10000000000000142
            }
        }
     * 
     * 
     */


    //params: eventId,authToken. 
    app.put(`${baseUrl}/:eventId/edit`, auth.isAuthorized,checkAdmin.isAuthorisedForEditAndDelete, eventController.editEvent);
    /**
     * 
     * @apiGroup edit
     * @apiVersion  1.0.0
     * @api {put} /api/v1/users/:eventId/edit to edit an event of a user .
     * 
     * @apiParam {string} eventId eventId of the event. (query params) (required).
     * @apiParam {string} authToken authToken of the admin. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "Event details edited",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
            }
        }
     * 
     */


    //params: eventId,authToken.
    app.post(`${baseUrl}/:eventId/delete`, auth.isAuthorized,checkAdmin.isAuthorisedForEditAndDelete, eventController.deleteEvent);
    /**
     * 
     * @apiGroup delete
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/:eventId/delete to delete an event of a user .
     * 
     * @apiParam {string} eventId eventId of the event. (query params) (required).
     * @apiParam {string} authToken authToken of the admin. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
            * {
            "error": false,
            "message": "Deleted the event successfully",
            "status": 200,
            "data": {
                "eventId": "RPrPN7nDy",
                "userMobileNumber": 12345676543,
                "createdOn": "2019-04-25T13:20:12.000Z",
                "createdBy": "Admin",
                "eventTitle": "meeting1",
                "eventLocation": "ranchi",
                "eventDescription": "description about meeting 1",
                "notificationToken": true,
                "_id": "5cc1b40cb90fc40d1b9c363f",
                "userEmail": "rahul1@gmail.com",
                "startTime": "2019-04-26T23:00:00.000Z",
                "endTime": "2019-04-28T02:00:00.000Z",
                "EventDurationInHours": 27,
                "__v": 0
            }
        }
     * 
     */
}
