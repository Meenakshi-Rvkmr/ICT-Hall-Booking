const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const fs=require("fs");
const multer = require("multer");

const path = require("path");
const bookingRoute = require("./routes/Bookings");
const loginRoute = require("./routes/Login");
const hallsRouter = require("./routes/HallRouter");
const halltypesRouter=require("./routes/HallTypeRouter");

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

  app.use("/hallimages", express.static(path.join(__dirname, "/images/hall-images")));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images/hall-images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload/hallimages", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });

  const DIR = path.join(__dirname, "/images/hall-images");
  app.delete('/api/hall/deleteimage/:imagename',function (req, res) {
    
      if (!req.params.imagename) {
          return res.status(500).json('error in delete');
      
        } else {
          
          fs.unlinkSync(DIR+'/'+req.params.imagename);
          return res.status(200).send('Successfully! Image has been Deleted');
        }  
  });

  app.use("/api/bookings", bookingRoute);
  app.use("/api/user", loginRoute);
  app.use("/api/halls", hallsRouter);
  app.use("/api/halltypes", halltypesRouter);

  app.listen(process.env.PORT || 5000, () => {
    console.log("Backend is running");
  });
  
  