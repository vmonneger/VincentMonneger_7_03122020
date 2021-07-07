const express = require('express');
const router = express.Router();
const commentaireCtrl = require("../controllers/commentaire");
const auth = require("../middleware/auth");

router.post("/postCommentaire", commentaireCtrl.createCommentaire);
router.get("/allCommentaire", commentaireCtrl.getAllCommentaire);
router.get("/oneCommentaire/:id", commentaireCtrl.getOneCommentaire);
router.put("/oneCommentaire/:id", commentaireCtrl.updateCommentaire);
router.delete("/oneCommentaire/:id", commentaireCtrl.deleteCommentaire);

module.exports = router;