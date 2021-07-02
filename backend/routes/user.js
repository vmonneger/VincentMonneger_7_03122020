const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.createUser);
router.post("/login", userCtrl.loginUser);
router.delete("/signup/:id", userCtrl.deleteUser);

module.exports = router;
