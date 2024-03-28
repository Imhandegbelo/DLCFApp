// import regeneratorRuntime from "regenerator-runtime";
const path = require("path");
const mime = require("mime");
const fs = require("fs");

const Participant = require("../models/participants");
const Feedbacks = require("../models/feedback");
const FileCollection = require("../models/files");
const Testimonies = require("../models/testimonies");
const { registrationData } = require("./data");

const CreateParticipant = (req, res) => {
  Participant.create({ ...req.body })
    .then((data) => {
      return res.json({
        message: `Congrats ${req.body.fullName || ""}`,
      });
    })
    .catch((err) => {
      console.log(err.message);
      const errorMessage =
        err.message && err.message.includes("phoneNumber")
          ? "Phone number is already registered"
          : "Some Error Occured";
      return res.status(400).json({
        err: err,
        message: err.message,
        customMessage: errorMessage,
      });
    });
};

const CheckUserData = (req, res) => {
  const { data } = req.body;
  let filteredData = [];
  if (data) {
    filteredData = registrationData.filter((dat) => {
      if (
        (dat.name &&
          dat.name.toLocaleLowerCase().includes(data.toLocaleLowerCase())) ||
        (dat.email &&
          dat.email.toLocaleLowerCase().includes(data.toLocaleLowerCase())) ||
        (dat.phoneNumber && dat.phoneNumber.includes(data))
      ) {
        return dat;
      }
    });
  }
  res.json(filteredData.slice(0, 15));
};

const GetFiles = async (req, res) => {
  try {
    let [fileCollection, count] = await Promise.all([
      FileCollection.find().sort("-created"),
      FileCollection.find().count(),
    ]);
    return res.json({
      fileCollection,
      count,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching files",
      err: err.message,
    });
  }
};

const DownloadFile = (req, res) => {
  const id = req.params.id;
  FileCollection.find({ _id: id })
    .then((data) => {
      let file = path.join(__dirname, `../${data[0].filePath}`);
      console.log(file);
      var filename = path.basename(file);
      var mimetype = mime.getType(file);

      res.setHeader("Content-disposition", "attachment; filename=" + filename);
      res.setHeader("Content-type", mimetype);

      var filestream = fs.createReadStream(file);
      filestream.pipe(res);
      // res.sendFile(file);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error fetching files",
        err: err.message,
      });
    });
};

const AuthMe = (req, res) => {
  let user = req.user;
  console.log(user);
  if (user) {
    return res.json({
      authenticated: true,
      user: user,
    });
  }
  return res.json({
    authenticated: false,
  });
};

const GetParticipants = async (req, res) => {
  let page = parseInt(Number(req.params.id));
  let searchKey = req.body.searchKey;
  let searchQuery = {};
  if (searchKey) {
    let search = {
      $regex: searchKey || "",
      $options: "i",
    };
    searchQuery = {
      $or: [
        {
          sid: search,
        },
        {
          fullName: search,
        },
        {
          denomination: search,
        },
        {
          category: search,
        },
        {
          phoneNumber: search,
        },
        {
          state: search,
        },
        {
          institution: search,
        },
        {
          status: search,
        },
      ],
    };
  }
  if (!page) {
    page = 1;
  }
  try {
    let [count, participants] = await Promise.all([
      Participant.find(searchQuery).count(),
      Participant.find(searchQuery)
        .sort("-created")
        .skip(page * 25 - 25)
        .limit(25),
    ]);
    return res.json({
      count,
      participants,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error Loading Participant List",
      error: err.message,
    });
  }
};

const GetFeedback = async (req, res) => {
  let page = parseInt(Number(req.params.id));
  let searchKey = req.body.searchKey;
  let searchQuery = {};
  if (searchKey) {
    let search = {
      $regex: searchKey || "",
      $options: "i",
    };
    searchQuery = {
      $or: [
        {
          sid: search,
        },
        {
          phoneNumber: search,
        },
        {
          message: search,
        },
        {
          transport: search,
        },
        {
          like: search,
        },
        {
          experience: search,
        },
        {
          improvements: search,
        },
        {
          category: search,
        },
      ],
    };
  }
  if (!page) {
    page = 1;
  }
  try {
    let [count, feedbacks] = await Promise.all([
      Feedbacks.find(searchQuery).count(),
      Feedbacks.find(searchQuery)
        .sort("-created")
        .skip(page * 25 - 25)
        .limit(25),
    ]);
    return res.json({
      count,
      feedbacks,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error Loading Participant List",
      error: err.message,
    });
  }
};

const GetTestimonies = async (req, res) => {
  let page = parseInt(Number(req.params.id));
  let searchKey = req.body.searchKey;
  let searchQuery = {};
  if (searchKey) {
    let search = {
      $regex: searchKey || "",
      $options: "i",
    };
    searchQuery = {
      $or: [
        {
          phoneNumber: search,
        },
        {
          fullName: search,
        },
        {
          testimony: search,
        },
        {
          category: search,
        },
      ],
    };
  }
  if (!page) {
    page = 1;
  }
  try {
    let [count, testimonies] = await Promise.all([
      Testimonies.find(searchQuery).count(),
      Testimonies.find(searchQuery)
        .sort("-created")
        .skip(page * 25 - 25)
        .limit(25),
    ]);
    return res.json({
      count,
      testimonies,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error Loading Participant List",
      error: err.message,
    });
  }
};

const CreateFeedback = (req, res) => {
  Feedbacks.create(req.body)
    .then((data) => {
      return res.json({
        message: `Created`,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        err: err,
        message: err.message,
        customMessage: "Error Creating Feedback",
      });
    });
};

const CreateTestimony = (req, res) => {
  Testimonies.create(req.body)
    .then((data) => {
      return res.json({
        message: `Created`,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        err: err,
        message: err.message,
        customMessage: "Error Creating Feedback",
      });
    });
};

module.exports = {
  CreateParticipant,
  CheckUserData,
  GetFiles,
  DownloadFile,
  AuthMe,
  GetParticipants,
  GetFeedback,
  GetTestimonies,
  CreateFeedback,
  CreateTestimony
};
