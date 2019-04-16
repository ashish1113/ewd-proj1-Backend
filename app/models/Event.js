const mongoose = require('mongoose')
const Schema = mongoose.Schema
const time = require('../libs/timeLib')

const Event = new Schema({
  userEmail: {
    type: String,
    
  }, eventId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  userMobileNumber: {
    type: Number,
    default: 0
  },
  createdOn :{
    type:Date,
    default:""
  },
    startTime: {
    type: Date,
    //default: time.now()
  },
  endTime: {
    type: Date,
    //default: time.now()
  },
  eventTitle: {
    type:String,
    default:'new event'
  },
  EventDurationInHours: {
    type:Number
  },
  eventLocation: {
    type: String,
    default:""
  },
  eventDescription:{
    type: String,
    default: ""
  },
  notificationToken:{
    type:Boolean,
    default :true
  }

})

module.exports = mongoose.model('Event', Event)
