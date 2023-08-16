const mongoose = require("mongoose");

const quotationScheema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "properties",
    },
    numberOfDesks: {
      type: Number,
    },
    numberOfPrivateOffices: {
      type: Number,
    },
    numberOfSmallConferenceRooms: {
      type: Number,
    },
    numberOfMediumConferenceRooms: {
      type: Number,
    },
    numberOfLargeConferenceRooms: {
      type: Number,
    },
    listOFDesks: [
      {
        type: Number,
      },
    ],

    listOFPrivateOffices: [
      {
        type: Number,
      },
    ],
    listOFSmallConferenceRooms: [
      {
        type: Number,
      },
    ],
    listOFMediumConferenceRooms: [
      {
        type: Number,
      },
    ],
    listOFLargeConferenceRooms: [
      {
        type: Number,
      },
    ],
    startDate: {
      type: Number,
    },
    endDate: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("quotations", quotationScheema);
