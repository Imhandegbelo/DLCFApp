const mongoose = require("mongoose");
const uuid = require("uuid");

// const Schema = mongoose.Schema;

const participantSchema = new mongoose.Schema({
  sid: {
    type: String,
    required: true,
    default: uuid,
    unique: true,
    index: true,
  },
  fullName: {
    type: String,
    // required: true
  },
  phoneNumber: {
    type: String,
    // required: true,
  },
  whatsAppNumber: {
    type: String,
  },
  gender: {
    type: String,
    // required: true
  },
  address: {
    type: String,
    // required: true
  },
  group: {
    type: String,
  },
  email: {
    type: String,
  },
  status: {
    type: String,
    // required: true
  },
  denomination: {
    type: String,
    // required: true
  },
  institution: {
    type: String,
  },
  course: {
    type: String,
  },
  ageGroup: {
    type: String,
    // required: true
  },
  category: {
    type: String,
    // required: true
  },
  region: {
    type: String,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Participant = mongoose.model("Participant", participantSchema);

Participant.syncIndexes();

module.exports = Participant;
