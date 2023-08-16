const express=require("express");
const { addSubscriber } = require("../controllers/subscribers");

const router=express.Router();


router.post("/addSubscriber",addSubscriber);


module.exports = router;