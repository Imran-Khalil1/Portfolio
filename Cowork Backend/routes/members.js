const express = require("express");
const { addMember, SpecificMemeber } = require("../controllers/membership");
const router = express.Router();

router.post("/addMembers", addMember);
router.get("/member/:id", SpecificMemeber);

module.exports = router;
