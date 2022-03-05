const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    AssociateName:{
        type:String,
        required:true,
    },
    ICTAKID:{
        type:String,
        required:true,
    },
    Title:{
        type:String,
        required:false,
    },
    HallName:{
        type:String,
        required:false,
    },
    startDate:{
        type:Date,
        required:false,
    },
    endDate:{
        type:Date,
        required:false,
    }
    
},{timestamps:true});

module.exports = mongoose.model("Booking", BookingSchema)