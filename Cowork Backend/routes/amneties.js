const express=require("express");
const { addAmneties, getAmneties, getSingleAmnity, editAmnity, deleteAmnity } = require("../controllers/amneties");
const router=express.Router();


router.post("/add/addAmnity", addAmneties);
router.get("/getAll/amnities", getAmneties);
router.get("/amnity/:id", getSingleAmnity);
router.put("/edit/amnity", editAmnity);
router.post(
  "/delete/amnity",
  deleteAmnity
);


module.exports = router;