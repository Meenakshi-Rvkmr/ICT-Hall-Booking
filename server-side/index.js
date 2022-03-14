const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const nodemailer = require("nodemailer")

require("dotenv").config()
const path = require("path");
const bookingRoute = require("./routes/Bookings");
const loginRoute = require("./routes/Login");
const hallsRouter = require("./routes/HallRouter");
const halltypesRouter = require("./routes/HallTypeRouter");
const userRoutes = require("./routes/users.route");
const AssociateRoute = require('./routes/Associate.route')

const MONGO_URL =
  "mongodb+srv://meenakshi:qazWSX123@cluster0.llhoa.mongodb.net/ICTHallBooking?retryWrites=true&w=majority";

app.use(express.json());
app.use(cors());

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
  })
  .then((res) => {
    console.log(`successful connection to BBDD`);
    //console.log(res);
  })
  .catch((error) => {
    console.log("error" + error.message);
  });

app.use(
  "/hallimages",
  express.static(path.join(__dirname, "/images/hall-images"))
);

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
app.delete("/api/hall/deleteimage/:imagename", function (req, res) {
  if (!req.params.imagename) {
    return res.status(500).json("error in delete");
  } else {
    fs.unlinkSync(DIR + "/" + req.params.imagename);
    return res.status(200).send("Successfully! Image has been Deleted");
  }
});

//send mail on confirmation
app.post('send_mail',async(req,res)=>{
  let {text} =req.body;
  const transport = nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    port:process.env.MAIL_PORT,
    auth:{
      user:process.env.MAIL_USER,
      pass:process.env.MAIL_PASS
    }
  })

  await transport.sendMail({
    from:process.env.MAIL_FROM,
    to:"roshinsrs@gmail.com",
    subject:"test mail",
    html:`<div className="email" style="
      border:1px solid black;
      padding:20px;
      font-family:sans-serif;
      line-height:2;
      font-size:20px;"
      >
      <h2>Here is your mail</h2>
      <p>${text}</p>
      <p>All the best,Darwin</p>
    </div>`
  })
})

app.use("/api/bookings", bookingRoute);
app.use("/api/user", loginRoute);
app.use("/api/halls", hallsRouter);
app.use("/api/halltypes", halltypesRouter);
app.use("/api/users", userRoutes);
app.use('/api/Associates', AssociateRoute)

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is running");
});
