const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const path = require("path");
const bookingRoute = require("./routes/Bookings");

const MONGO_URL = "mongodb+srv://meenakshi:qazWSX123@cluster0.llhoa.mongodb.net/ICTHallBooking?retryWrites=true&w=majority"

app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
  }).then((res)=>
  {
      console.log(`successful connection to BBDD`);
     //console.log(res);
  
  })
  .catch((error)=>{  
      console.log("error"+error.message);
  });

  app.use("/api/bookings", bookingRoute);

  app.listen(process.env.PORT || 5000, () => {
    console.log("Backend is running");
  });
  
  