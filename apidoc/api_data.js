define({ "api": [
  {
    "group": "delete",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/:eventId/delete",
    "title": "to delete an event of a user .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "eventId",
            "description": "<p>eventId of the event. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the admin. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Deleted the event successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"eventId\": \"RPrPN7nDy\",\n                \"userMobileNumber\": 12345676543,\n                \"createdOn\": \"2019-04-25T13:20:12.000Z\",\n                \"createdBy\": \"Admin\",\n                \"eventTitle\": \"meeting1\",\n                \"eventLocation\": \"ranchi\",\n                \"eventDescription\": \"description about meeting 1\",\n                \"notificationToken\": true,\n                \"_id\": \"5cc1b40cb90fc40d1b9c363f\",\n                \"userEmail\": \"rahul1@gmail.com\",\n                \"startTime\": \"2019-04-26T23:00:00.000Z\",\n                \"endTime\": \"2019-04-28T02:00:00.000Z\",\n                \"EventDurationInHours\": 27,\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "delete",
    "name": "PostApiV1UsersEventidDelete"
  },
  {
    "group": "edit",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/users/:eventId/edit",
    "title": "to edit an event of a user .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "eventId",
            "description": "<p>eventId of the event. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the admin. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Event details edited\",\n            \"status\": 200,\n            \"data\": {\n                \"n\": 1,\n                \"nModified\": 1,\n                \"ok\": 1\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "edit",
    "name": "PutApiV1UsersEventidEdit"
  },
  {
    "group": "events",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:email/details/allEvents",
    "title": "to get all events of a user .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the admin. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Events Details Found\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"eventId\": \"xdwmZUHma\",\n                    \"userMobileNumber\": 0,\n                    \"createdOn\": \"2019-04-25T12:02:04.000Z\",\n                    \"createdBy\": \"Admin\",\n                    \"eventTitle\": \"meeting planning for satu\",\n                    \"eventLocation\": \"ranchi\",\n                    \"eventDescription\": \"description about meeting 1\",\n                    \"notificationToken\": true,\n                    \"userEmail\": \"satu@gmail.com\",\n                    \"startTime\": \"2019-04-25T12:04:00.000Z\",\n                    \"endTime\": \"2019-04-25T12:10:00.000Z\",\n                    \"EventDurationInHours\": 0.10000000000000142\n                },\n                {\n                    \"eventId\": \"r-fQqXe06\",\n                    \"userMobileNumber\": 0,\n                    \"createdOn\": \"2019-04-25T12:09:46.000Z\",\n                    \"createdBy\": \"Admin\",\n                    \"eventTitle\": \"meeting with satu\",\n                    \"eventLocation\": \"ranchi\",\n                    \"eventDescription\": \"d\",\n                    \"notificationToken\": true,\n                    \"userEmail\": \"satu@gmail.com\",\n                    \"startTime\": \"2019-04-25T12:12:00.000Z\",\n                    \"endTime\": \"2019-04-25T12:15:00.000Z\",\n                    \"EventDurationInHours\": 0.05000000000000071\n                }\n                \n            ]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "events",
    "name": "GetApiV1UsersEmailDetailsAllevents"
  },
  {
    "group": "events",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/read/:currentEventId/Details",
    "title": "to get an event of a user .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "currentEventId",
            "description": "<p>currentEventId of the event. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the admin. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"Event Details Found\",\n            \"status\": 200,\n            \"data\": {\n                \"eventId\": \"xdwmZUHma\",\n                \"userMobileNumber\": 0,\n                \"createdOn\": \"2019-04-25T12:02:04.000Z\",\n                \"createdBy\": \"Admin\",\n                \"eventTitle\": \"meeting planning for satu\",\n                \"eventLocation\": \"ranchi\",\n                \"eventDescription\": \"description about meeting 1\",\n                \"notificationToken\": true,\n                \"userEmail\": \"satu@gmail.com\",\n                \"startTime\": \"2019-04-25T12:04:00.000Z\",\n                \"endTime\": \"2019-04-25T12:10:00.000Z\",\n                \"EventDurationInHours\": 0.10000000000000142\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "events",
    "name": "GetApiV1UsersReadCurrenteventidDetails"
  },
  {
    "group": "events",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/create/event",
    "title": "to create new event.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "eventTitle",
            "description": "<p>eventTitle of the user. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "userMobileNumber",
            "description": "<p>userMobileNumber of the user. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "startDate",
            "description": "<p>startDate of the user. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "endDate",
            "description": "<p>endDate of the user. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "eventLocation",
            "description": "<p>eventLocation of the user. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "eventDescription",
            "description": "<p>eventDescription of the user. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "startHours",
            "description": "<p>startHours of the user. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "startMins",
            "description": "<p>startMins of the user. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "endHours",
            "description": "<p>endHours of the user. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "endMins",
            "description": "<p>endMins of the user. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the admin. (body params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"Event created\",\n            \"status\": 200,\n            \"data\": {\n                \"eventId\": \"nqXaCaU8D\",\n                \"userMobileNumber\": 9431562056,\n                \"createdOn\": \"2019-04-25T17:53:23.000Z\",\n                \"createdBy\": \"Admin\",\n                \"eventTitle\": \"meeting of rahul\",\n                \"eventLocation\": \"ranchi\",\n                \"eventDescription\": \"description about meeting 1\",\n                \"notificationToken\": true,\n                \"_id\": \"5cc1f4131b253a1698c8b242\",\n                \"userEmail\": \"rahul1@gmail.com\",\n                \"startTime\": \"2019-04-26T05:00:00.000Z\",\n                \"endTime\": \"2019-04-26T07:00:00.000Z\",\n                \"EventDurationInHours\": 2,\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "events",
    "name": "PostApiV1UsersCreateEvent"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/forgot/password",
    "title": "to recover forgot password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n          \"error\": false,\n          \"message\": \"mail-sent successfully\",\n          \"status\": 200,\n          \"data\": {\n              \"userId\": \"uyQ41VER_\",\n              \"userName\": \"manurai@gmail.com\",\n              \"firstName\": \"manu\",\n              \"lastName\": \"rai\",\n              \"password\": \"8659c6c0d2d71d1beeaf7d7b398cea98\",\n              \"email\": \"manurai@gmail.com\",\n              \"mobileNumber\": 9431562056,\n              \"createdOn\": \"2019-04-11T11:24:30.000Z\",\n              \"typeOfUser\": \"Normal\",\n              \"_id\": \"5caf23eebaccff1e25868797\",\n              \"country\": \"india\",\n              \"countryCode\": \"91\",\n              \"__v\": 0,\n              \"resetPasswordToken\": \"SDCye-kQl\",\n              \"resetPasswordExpires\": \"2019-04-11T18:37:43.311Z\"\n          }\n      }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersForgotPassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImxKc2V1V3p5LSIsImlhdCI6MTU1NDk4MjE1MTczOCwiZXhwIjoxNTU1MDY4NTUxLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6InV5UTQxVkVSXyIsInVzZXJOYW1lIjoibWFudXJhaUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJtYW51IiwibGFzdE5hbWUiOiJyYWkiLCJlbWFpbCI6Im1hbnVyYWlAZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjo5NDMxNTYyMDU2LCJ0eXBlT2ZVc2VyIjoiTm9ybWFsIiwiY291bnRyeSI6ImluZGlhIiwiY291bnRyeUNvZGUiOiI5MSJ9fQ.Kw0-0f8GGKnWgGAxGJ-9csTXG7wTPygeRTxww8pf1l8\",\n        \"userDetails\": {\n            \"userId\": \"uyQ41VER_\",\n            \"userName\": \"manurai@gmail.com\",\n            \"firstName\": \"manu\",\n            \"lastName\": \"rai\",\n            \"email\": \"manurai@gmail.com\",\n            \"mobileNumber\": 9431562056,\n            \"typeOfUser\": \"Normal\",\n            \"country\": \"india\",\n            \"countryCode\": \"91\"\n        }\n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "to logout user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (auth headers) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/reset/:token",
    "title": "to reset new password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "newPassword",
            "description": "<p>newPassword of the user. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>resetPasswordToken generated in forgot password. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"mail sent successfully after reset-password.\",\n            \"status\": 200,\n            \"data\": null\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersResetToken"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobileNumber of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "country",
            "description": "<p>country of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User created\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"5IjxA4NXq\",\n        \"userName\": \"manu123@gmail.com\",\n        \"firstName\": \"manu\",\n        \"lastName\": \"rai\",\n        \"email\": \"manu123@gmail.com\",\n        \"mobileNumber\": 9431562056,\n        \"createdOn\": \"2019-04-11T07:50:55.000Z\",\n        \"typeOfUser\": \"Normal\",\n        \"_id\": \"5caef1df8ac5b642b5a16316\",\n        \"country\": \"india\",\n        \"countryCode\": \"91\",\n        \"__v\": 0\n       \n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  }
] });
