const mongoose = require("mongoose");

const propertyScheema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    capacity: {
      type: Number,
    },
    type: {
      type: String,
      enum: ["private office", "coWorking", "mix"],
      default: "private office",
    },
    privateOfficeNumber: {
      type: Number,
      default: 0,
    },
    privateOffices: [
      {
        id: { type: Number },
        bookings: [
          {
            startDate: {
              type: Number,
              default: null,
            },
            endDate: {
              type: Number,
              default: null,
            },
          },
        ],
        reserved: {
          type: Boolean,
          default: false,
        },
      },
    ],
    pricePerOffice: {
      type: Number,
      default: 0,
    },
    numberOfDesks: {
      type: Number,
      default: 0,
    },
    desks: [
      {
        id: { type: Number },
        bookings: [
          {
            startDate: {
              type: Number,
              default: null,
            },
            endDate: {
              type: Number,
              default: null,
            },
          },
        ],
        reserved: {
          type: Boolean,
          default: false,
        },
      },
    ],
    pricePerDesk: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        review: {
          name: { type: String },
          rating: { type: Number },
          description: { type: String },
        },
      },
    ],
    availability: {
      type: Boolean,
    },
    area: {
      type: String,
    },
    price: {
      type: Number,
    },
    amenities: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "amneties",
    },
    images: [
      {
        image: {
          type: String,
        },
      },
    ],
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    lat: {
      type: String,
    },
    lng: {
      type: String,
    },
    title: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    conferenceRoom: {
      type: Boolean,
      default: false,
    },
    NSmallC: {
      type: Number,
      default: 0,
    },
    NMediumC: {
      type: Number,
      default: 0,
    },
    NLargeC: {
      type: Number,
      default: 0,
    },
    SmallCPrice: {
      type: Number,
      default: 0,
    },
    MediumCPrice: {
      type: Number,
      default: 0,
    },
    LargeCPrice: {
      type: Number,
      default: 0,
    },
    SmallConference: [
      {
        id: { type: Number },
        bookings: [
          {
            startDate: {
              type: Number,
              default: null,
            },
            endDate: {
              type: Number,
              default: null,
            },
          },
        ],
      },
    ],
    MediumConference: [
      {
        id: { type: Number },
        bookings: [
          {
            startDate: {
              type: Number,
              default: null,
            },
            endDate: {
              type: Number,
              default: null,
            },
          },
        ],
      },
    ],
    LargeConference: [
      {
        id: { type: Number },
        bookings: [
          {
            startDate: {
              type: Number,
              default: null,
            },
            endDate: {
              type: Number,
              default: null,
            },
          },
        ],
      },
    ],
    reservedOffices: [
      {
        type: Number,
      },
    ],
    reservedDesks: [
      {
        type: Number,
      },
    ],
  },
  { timeStamps: true }
);

module.exports = mongoose.model("properties", propertyScheema);
