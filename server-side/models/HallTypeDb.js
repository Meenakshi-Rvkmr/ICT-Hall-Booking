const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var halltypeSchema = new Schema(
    {
        name: {
          type: String,
          required: true,
          unique: true,
        },
      },
      { timestamps: true }
    );

var HallTypes = mongoose.model('halltypes', halltypeSchema);

module.exports = HallTypes;