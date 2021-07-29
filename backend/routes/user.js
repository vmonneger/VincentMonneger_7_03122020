const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/signup", userCtrl.createUser);
router.post("/login", userCtrl.loginUser);
router.get("/account/:id", userCtrl.getOneUser);
router.get("/account", userCtrl.getAllUser);
router.delete("/account/:id", auth, userCtrl.deleteUser);
router.patch("/account/:id", auth, userCtrl.updateUser);

module.exports = router;
