const express = require('express'); 
const hallsRouter = express.Router();
const Halls = require("../model/HallDB");


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

  const hall = await Halls.findById(req.params.id);
    if(hall){
      try {
        const updateHall = await Halls.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updateHall);
      } catch (err) {
        res.status(500).json(err);
      }
    }else{

    }res.status(401).json("Something went Wrong");
      
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
    const halltype = req.query.hall;
    try {
      let halls;
      if (halltype) {
        halls = await Halls.find({ halltype }).sort({createdAt:-1}).limit(4);
      } else {
        halls = await Halls.find().sort({createdAt:-1}).limit(3);
      }
      res.status(200).json(halls);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = hallsRouter;

