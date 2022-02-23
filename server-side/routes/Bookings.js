const router = require("express").Router();
const Booking = require("../models/Booking");

//CREATE POST
router.post("/", async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {  
  try {
    let bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
