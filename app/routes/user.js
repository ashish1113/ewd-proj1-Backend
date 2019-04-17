const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const eventController = require("./../../app/controllers/eventController")
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')
const checkAdmin = require('./../middlewares/checkAdmin')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    // defining routes.


    // params: firstName, lastName, email, mobileNumber, password
    app.post(`${baseUrl}/signup`, userController.signUpFunction);

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
     * @apiSuccessExample {object} Successhe-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
                "userDetails": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "Sengar",
                "firstName": "Rishabh",
                "userId": "-E9zxTYA8"
            }

        }
    */

    // params: email, password.
    app.post(`${baseUrl}/login`, userController.loginFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout to logout user.
     *
     * @apiParam {string} userId userId of the user. (auth headers) (required)
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

    // auth token params: userId.
    app.post(`${baseUrl}/logout`,auth.isAuthorized, userController.logout);

    //for forgot password
    app.post(`${baseUrl}/forgot/password`, userController.forgotPassword);

    app.post(`/reset/:token`,userController.resetPassword);
//------------------------------------------from here event routes starrt-------------------------------------------------------------------------------
    //to create event
    app.post(`${baseUrl}/event`,auth.isAuthorized,checkAdmin.isAdmin, eventController.eventCreator);

    app.get(`${baseUrl}/:email/details/allEvents`,auth.isAuthorized,eventController.getSingleUserEvents);

    app.put(`${baseUrl}/:eventId/edit`, auth.isAuthorized,checkAdmin.isAuthorisedForEditAndDelete, eventController.editEvent);

    app.post(`${baseUrl}/:eventId/delete`, auth.isAuthorized,checkAdmin.isAuthorisedForEditAndDelete, eventController.deleteEvent);
}
