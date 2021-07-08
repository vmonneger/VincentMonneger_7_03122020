const express = require('express');
const router = express.Router();
const commentaireCtrl = require("../controllers/commentaire");
const auth = require("../middleware/auth");

router.post("/postCommentaire", auth, commentaireCtrl.createCommentaire);
router.get("/allCommentaire", auth, commentaireCtrl.getAllCommentaire);
router.get("/oneCommentaire/:id", auth, commentaireCtrl.getOneCommentaire);
router.put("/oneCommentaire/:id", auth, commentaireCtrl.updateCommentaire);
router.delete("/oneCommentaire/:id", auth, commentaireCtrl.deleteCommentaire);

module.exports = router;