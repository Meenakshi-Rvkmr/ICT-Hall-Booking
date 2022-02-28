const express = require('express'); 
const halltypesRouter = express.Router();
const Halltypes = require("../model/HallTypeDb");


//CREATE HALL TYPE
halltypesRouter.post("/", async (req, res) => {
    const newHallType = new Halltypes(req.body);
    try {
      const saveHallType = await newHallType.save();
      res.status(200).json(saveHallType);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//GET HALL TYPE
halltypesRouter.get("/", async (req, res) => {
    try {
      const hallTypes = await Halltypes.find();
      res.status(200).json(hallTypes);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = halltypesRouter;