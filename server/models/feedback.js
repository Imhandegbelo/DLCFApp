const mongoose = require("mongoose");
const uuid = require("uuid");

// const Schema = mongoose.Schema;

const feedbackSchema = new mongoose.Schema({
  sid: {
    type: String,
    required: true,
    default: uuid,
    unique: true,
  },
  phoneNumber: {
    type: String,
    // required: true,
    index: true,
    // unique: true
  },
  message: {
    type: String,
  },
  transport: {
    type: String,
  },
  like: {
    type: String,
  },
  experience: {
    type: String,
  },
  improvements: {
    type: String,
  },
  category: {
    type: String,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Feedbacks", feedbackSchema);
