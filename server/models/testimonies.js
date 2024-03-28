const mongoose = require("mongoose");
const uuid = require("uuid");

// const Schema = mongoose.Schema;

const testimonySchema = new mongoose.Schema({
  sid: {
    type: String,
    required: true,
    default: uuid,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    // unique: true
  },
  fullName: {
    type: String,
    required: true,
  },
  testimony: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Testimonies", testimonySchema);
