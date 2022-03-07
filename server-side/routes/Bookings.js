const router = require("express").Router();
const Bookings = require("../models/Booking");

//CREATE Booking
router.post("/",async(req,res)=>{

  const newBooking = new Bookings(req.body);
  try {
  const saveBooking = await newBooking.save();
  res.status(200).json(saveBooking);
  } 
  catch (err) {
  res.status(500).json(err);
  }
})
  
//GET ALL Bookings
router.get("/", async (req, res) => {  
  try {
    let bookings = await Bookings.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
