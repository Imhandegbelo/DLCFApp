const mongoose = require("mongoose");
const uuid = require("uuid");

// const Schema = mongoose.Schema;

const fileSchema = new mongoose.Schema({
  sid: {
    type: String,
    required: true,
    default: uuid
  },
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
});

module.exports = mongoose.model("File", fileSchema);
