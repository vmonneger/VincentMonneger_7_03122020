const express = require('express');
const router = express.Router();
const articleCtrl = require("../controllers/article");
const auth = require("../middleware/auth");

router.post("/postArticle", articleCtrl.createArticle);
router.get("/allArticle", articleCtrl.getAllArticle);
router.get("/oneArticle/:id", articleCtrl.getOneArticle);
router.put("/oneArticle/:id", articleCtrl.updateArticle);
router.delete("/oneArticle/:id", articleCtrl.deleteArticle);

module.exports = router;