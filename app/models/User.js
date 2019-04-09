'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  userName: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: 'passskdajakdjkadsj'
  },
  email: {
    type: String,
    default: '',
    unique: true
  },
  mobileNumber: {
    type: Number,
    default: 0
  },
  createdOn :{
    type:Date,
    default:""
  },
  typeOfUser :{
    type:String,
    default:"Normal"
  }


})


mongoose.model('User', userSchema);