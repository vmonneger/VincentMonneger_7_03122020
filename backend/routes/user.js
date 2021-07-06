const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/signup", userCtrl.createUser);
router.post("/login", userCtrl.loginUser);
router.delete("/account/:id", auth, userCtrl.deleteUser);

module.exports = router;
