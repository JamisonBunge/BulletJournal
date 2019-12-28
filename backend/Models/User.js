
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    //pass through an object that desrcribes how the data will be stored
    _id: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    password: String
    //we dont need to declare ID and author ID because mongoDB will crease these
    //by itself
    //this is about telling the DB what info is being sored


});

module.exports = mongoose.model('User', userSchema)