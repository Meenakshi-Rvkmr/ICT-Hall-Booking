//For schedule meeting module
const mongoose = require('mongoose');
    
const booking = new mongoose.Schema({
    associateName:{
        type:String,
        required:true
    },   
    ICTAKID:{
        type:String,
        required:true
    },
    title:{ 
        type:String, required:true
    },
    hall:{
        type:String, required:true
    },
    date:{
        type:String, required:true
    },   
    starttime:{
        type: Date,
        required:true
    },
    endtime:{
        type: Date,
        required:true
    }
},{timestamps:true})

var Bookings = mongoose.model('bookings', booking);

module.exports = Bookings;