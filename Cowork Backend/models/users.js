const mongoose = require("mongoose");

const userScheema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
      min: 5,
      max: 20,
    },
    email: {
      type: String,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["tenet", "lessor", "admin"],
      default: "tenet",
    },
    properties: [
      {
        property: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "properties",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userScheema);
