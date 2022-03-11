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

  //console.log(`req.params.selecteddate`,req.query.date) 
  let qdate = req.query.date;
  let username = req.query.username;
  let hallname = req.query.hallname;
  console.log(req)
  let bookings;
  try {
    if(qdate){
      bookings = await Bookings.find({"date":qdate});
    }else if(username){
      bookings = await Bookings.find({"associateName":username});
    }else if(hallname){
      bookings = await Bookings.find({"hall":hallname});
    }
    else{
      bookings = await Bookings.find()
    }
    res.status(200).json(bookings);
    
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/search/:hallName",async(req,res)=>{
  
  let temp1 = req.params.hallName;
  let qdate = req.query.mdate;
    console.log(`temp1`,temp1)  
    console.log(`qdate`,qdate)
  let bookings;
  try {
    if(qdate){
      bookings = await Bookings.find({"date":qdate,"hall":temp1});
    }
    else{
      bookings = await Bookings.find()
    }
    res.status(200).json(bookings);
    
  } catch (err) {
    res.status(500).json(err);
  }

})

module.exports = router;
