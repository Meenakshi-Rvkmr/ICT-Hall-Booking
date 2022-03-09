const router = require("express").Router();
const Bookings = require("../models/Booking");
const moment = require('moment')

//CREATE Booking
router.post("/",async(req,res)=>{
  console.log('entered')
  const newBooking = new Bookings(req.body);
  try {
  const saveBooking = await newBooking.save();
  res.status(200).json(saveBooking);
  console.log(saveBooking);
  } 
  catch (err) {
  res.status(500).json(err);
  }
})   
  
//GET ALL Bookings
router.get("/", async (req, res) => { 

  console.log(`req.params.selecteddate`,req.query.date) 
  let qdate = req.query.date;
  let bookings;
  try {
    if(qdate){
      bookings = await Bookings.find({"date":qdate});
    }
    else{
      bookings = await Bookings.find()
    }
    res.status(200).json(bookings);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
