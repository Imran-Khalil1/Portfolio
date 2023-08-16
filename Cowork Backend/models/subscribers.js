const mongoose = require("mongoose");

const subscribersScheema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subscribers", subscribersScheema);
