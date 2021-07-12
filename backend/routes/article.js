const express = require('express');
const router = express.Router();
const articleCtrl = require("../controllers/article");
const auth = require("../middleware/auth");

router.post("/postArticle", auth, articleCtrl.createArticle);
router.get("/allArticle", auth, articleCtrl.getAllArticle);
router.get("/oneArticle/:id", auth, articleCtrl.getOneArticle);
router.put("/oneArticle/:id", auth, articleCtrl.updateArticle);
router.delete("/oneArticle/:id", auth, articleCtrl.deleteArticle);

module.exports = router;