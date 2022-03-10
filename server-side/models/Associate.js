const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AssociateSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  ictakid: {
    type: String
  },
  phone: {
    type: Number
  },
  password: {
    type: String
  }
}, {
    collection: 'Associates'
  })

module.exports = mongoose.model('Associate', AssociateSchema)