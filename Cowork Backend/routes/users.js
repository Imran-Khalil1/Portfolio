const express = require("express");
const {
  singup,
  signIn,
  editUser,
  userStats,
  userBasedOnRole,
  allClients,
  deleteUser,
} = require("../controllers/users");
const router = express.Router();

router.post("/signup", singup);
router.post("/signIn", signIn);
router.put("/editUser", editUser);
router.get("/userStats", userStats);
router.get("/userRole", userBasedOnRole);
router.get("/allUsers", allClients);
router.post("/deleteUser", deleteUser);

module.exports = router;
