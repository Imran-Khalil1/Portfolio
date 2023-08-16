const express = require("express");
const {
  addProperty,
  getProperties,
  specificProperty,
  getApprovedProperties,
  addReview,
  propertyonCity,
  searchProperty,
  propertyBasedonUser,
  Payments,
  Available,
  releaseBooking,
  FindProp,
  EditProperty,
  changeReserve,
} = require("../controllers/propertry");
const router = express.Router();

router.post("/addProperty", addProperty);
router.get("/allProperties", getProperties);
router.get("/property/:id", specificProperty);
router.get("/approvedProperty", getApprovedProperties);
router.put("/addReview", addReview);
router.get("/cityProperty", propertyonCity);
router.get("/searchProperties", searchProperty);
router.get("/userProperites", propertyBasedonUser);
router.post("/payment", Payments);
router.post("/availability", Available);
router.post("/releaseBooking", releaseBooking);
router.get("/findProp", FindProp);
router.put("/editProperty", EditProperty);
router.post("/changeReserve", changeReserve);

module.exports = router;
