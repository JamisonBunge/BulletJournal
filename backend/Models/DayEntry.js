
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dayEntrySchema = new Schema({
    //pass through an object that desrcribes how the data will be stored
    //ID is done by atlas

    date: String,
    month: String,
    year: String,
    journalID: String,
    status: String,
    frontEndID: String,
    fullDate: String,
});

module.exports = mongoose.model('DayEntry', dayEntrySchema)