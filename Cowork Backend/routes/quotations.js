const express = require("express");
const {
  addQuotation,
  getBookings,
  getBookingByID,
} = require("../controllers/quotations");

const router = express.Router();

router.post("/addquotations", addQuotation);
router.get("/bookings/:id", getBookings);
router.get("/bookingById/:id", getBookingByID);

module.exports = router;
