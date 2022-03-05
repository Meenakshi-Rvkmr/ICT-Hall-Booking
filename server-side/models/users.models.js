const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Email: String,
    Fullname: String,
    Ictakid : String,
    Number: String,
    Password: String,
}, {timestamps: true})




module.exports = mongoose.model('users', UserSchema)
