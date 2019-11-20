
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dayEntrySchema = new Schema({
    //pass through an object that desrcribes how the data will be stored

    //ID is done by atlas
    day: String,
    month: String,
    year: String,
    journalID: String,
    status: String,
    frontEndID: String,
    date: String,
    //we dont need to declare ID and author ID because mongoDB will crease these
    //by itself
    //this is about telling the DB what info is being sored

});

module.exports = mongoose.model('DayEntry', dayEntrySchema)