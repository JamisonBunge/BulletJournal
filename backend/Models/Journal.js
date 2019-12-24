
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = new Schema({
    //pass through an object that desrcribes how the data will be stored

    //ID is done by atlas
    name: String,
    _id: Schema.Types.ObjectId,
    keys: [String],
    colors: [String],
    userID: String,
    createdOn: String,
    journalID: String
    //we dont need to declare ID and author ID because mongoDB will crease these
    //by itself
    //this is about telling the DB what info is being sored


});

module.exports = mongoose.model('Journal', journalSchema)