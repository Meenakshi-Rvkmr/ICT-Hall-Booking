const express = require('express'); 
const hallsRouter = express.Router();
const Halls = require("../models/HallDB");


//CREATE Hall
hallsRouter.post("/", async (req, res) => {
  const newHall = new Halls(req.body);
  try {
    const saveHall = await newHall.save();
    res.status(200).json(saveHall);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Hall Details
hallsRouter.put("/:id", async (req, res) => {
  
  try {
    const updateHall = await Halls.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateHall);
  } catch (err) {
    res.status(500).json(err);
  }
      
});

//DELETE HALL
hallsRouter.delete("/:id", async (req, res) => {
  try {
    const hall = await Halls.findById(req.params.id);
      try {
        await hall.delete();
        res.status(200).json("Hall has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SPECIFIC HALL
hallsRouter.get("/:id", async (req, res) => {
  try {
    const hall = await Halls.findById(req.params.id);
    res.status(200).json(hall);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL HALL
hallsRouter.get("/", async (req, res) => {
  try {
    let halls  = await Halls.find();
    res.status(200).json(halls);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL HALL OFFESET
hallsRouter.get("/:offsetValue/page", async (req, res) => {
  const halltype = req.query.hall;
  const tempValue=parseInt(req.params.offsetValue);
  try {
    let halls;
    if (halltype) {
      halls = await Halls.find({ halltype }).sort({createdAt:-1}).limit(3);
    } else {
      halls= await Halls.aggregate([
        {$sort:{"createdAt":-1}},
        {$skip:tempValue},
        {$limit:3}
      ])
    }
    res.status(200).json(halls);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET TOTAL COUNT OF  HALL 
hallsRouter.get("/counthall/all", async (req, res) => {
  try {
    let no_of_halls  = await Halls.countDocuments();
    res.status(200).json(no_of_halls);
  } catch (err) {
    res.status(500).json(err);    
  }
});


module.exports = hallsRouter;

