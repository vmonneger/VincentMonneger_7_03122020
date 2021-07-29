const Article = require('../models/Article');


exports.createArticle =  (req, res, next) => {
  if (!req.body.user_id) {
    res.status(403).json({ error: "L'user id n'est pas renseigné."})
  } else if (!req.body.titre) {
    res.status(403).json({ error: "Vous devez ajouter un titre."})
  } else if (!req.body.contenu) {
    res.status(403).json({ error: "Vous devez ajouter du contenu."})
  } else {
    const newArticle = new Article({
      user_id: req.body.user_id,
      titre: req.body.titre,
      contenu: req.body.contenu,
      date: new Date(),
      image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    Article.create(newArticle, (err, result) => {
      if (err || result.errno === 1406) {
        res.status(400).json({ error: "Le contenu contient trop de charactères." });
      } else {
        console.log(newArticle);
        res.status(201).json({ message: "Votre article a été enregistré !" });
      }
    });
  }
};

exports.getAllArticle = (req, res, next) => {
  Article.getAll((err, result) => {
    if (err) {
      console.log(result);
      res.status(500).json({ error: err });
    } else {
      res.status(201).json(result);
    }
  });
};

exports.getOneArticle = (req, res, next) => {
  Article.getOne(req.params.id, (err, result) => {
    console.log(result);
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json(result);
    }
  });
};

exports.updateArticle = (req, res, next) => {
  if (!req.body.titre) {
    res.status(403).json({ error: "Vous devez ajouter un titre."})
  } else if (!req.body.contenu) {
    res.status(403).json({ error: "Vous devez ajouter du contenu."})
  } else {
    const newArticle = new Article({
      titre: req.body.titre,
      contenu: req.body.contenu
    });
    Article.update(req.params.id, newArticle, (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(201).json({ message: "Article modifié !"});
      }
    });
  }
};

exports.deleteArticle = (req, res, next) => {
  Article.delete(req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      res.status(201).json({message: "Article supprimé !"});
    }
  })
};

exports.totalArticle = (req, res, next) => {
  Article.total((err, result) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      res.status(201).json(result);
    }
  })
};

exports.allArticleUser = (req, res, next) => {
  Article.getAllUser(req.params.id, (err, result) => {
    console.log(result);
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json(result);
    }
  });
};
