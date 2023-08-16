const mongoose = require("mongoose");

const amnetiesScheema = new mongoose.Schema(
  {
    internet: {
      type: Boolean,
    },
    powerBackup: {
      type: Boolean,
    },
    Kitchen: {
      type: Boolean,
    },
    waitingArea: {
      type: Boolean,
    },
    PrintingAndScanning: {
      type: Boolean,
    },
    conferenceRoom: {
      type: Boolean,
    },
    coolingAndHeating: {
      type: Boolean,
    },
    receptionServices: {
      type: Boolean,
    },
    septateWashroom: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("amneties", amnetiesScheema);
