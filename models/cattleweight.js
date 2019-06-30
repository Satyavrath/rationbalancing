// cattleweight schema for storing cattle weights and weight gain

const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const nutrientSchema = new mongoose.Schema({
    NEg:Number,
    Mp:Number,
    Ca:Number,
    p:Number

});
const weightGain = new mongoose.Schema({
    gain: Number,
    nutrients: [nutrientSchema]

});
const cattleWeightSchema = new mongoose.Schema({
    _id: Number,
    cattleWeight: Number,
    gainPerDay:[weightGain]

});

module.exports = mongoose.model('cattleWeight',cattleWeightSchema);