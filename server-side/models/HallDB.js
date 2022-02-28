const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var hallSchema = new Schema(
    {
        name: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        starttime: {
          type: Date,
          required: true,
        },
        endtime: {
          type: Date,
          required: true,
        },
        capacity: {
          type: Number,
          default: "",
        },
        hallimg: {
          type: String,
          default: "",
        },        
        halltype:{
          type:String,
          default:"",
        },
      },
      { timestamps: true }
    );

var Halls = mongoose.model('halls', hallSchema);

module.exports = Halls;