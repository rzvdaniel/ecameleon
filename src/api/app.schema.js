
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appSchema = new Schema({
    createdDate: Date,
    updatedDate: Date
})

module.exports = appSchema;