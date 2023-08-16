const mongoose = require("mongoose");

const memberShipScheema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "properties",
    },
    title: {
      type: String,
      enum: ["monthly", "6 months", "yearly"],
    },
    pricePerOffice: {
      type: Number,
      required: true,
    },
    pricePerDesk: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("memberShips", memberShipScheema);
