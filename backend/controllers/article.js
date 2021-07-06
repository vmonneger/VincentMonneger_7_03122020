const Article = require('../models/Article');


exports.createArticle = (req, res, next) => {
  if (!req.body.user_id) {
    res.status(403).json({ error: "Le user id n'est pas renseigné." });
  } else if (!req.body.contenu) {
    res.status(403).json({ error: "Vous devez écrire du contenu." });
  } else {
    const newArticle = new Article({
    user_id: 13,
    contenu: req.body.contenu,
    date: new Date()
    })
    console.log(newArticle);
    Article.create = (newArticle, (err, result) => {
      console.log(newArticle);
      if (err) {
        console.log(newArticle);
        res.status(400).json({ error: err });
      } else {
        console.log(newArticle);
        res.status(201).json({ message: "Post créé !" });
      }
    });
  }
};