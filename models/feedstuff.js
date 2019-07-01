// feedstuff schema for storing ingredients required for cattle

const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const feesstuffSchema = new mongoose.Schema({
    _id:Number,
    name:Number
})
module.exports = mongoose.model('feedstuff',feesstuffSchema); 
