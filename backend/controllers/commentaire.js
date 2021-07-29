const Commentaire = require('../models/Commentaire');


exports.createCommentaire =  (req, res, next) => {
    if (!req.body.article_id) {
      res.status(403).json({ error: "L'article id n'est pas renseigné."})
    } else if (!req.body.user_id) {
      res.status(403).json({ error: "L'user id n'est pas renseigné."})
    } else if (!req.body.message) {
      res.status(403).json({ error: "Vous devez ajouter un message."})
    } else {
      const newCommentaire = new Commentaire({
        article_id: req.body.article_id,
        user_id: req.body.user_id,
        message: req.body.message,
        date: new Date()
      })
      console.log(newCommentaire);
      Commentaire.create(newCommentaire, (err, result) => {
        if (err || result.errno === 1452) {
          res.status(400).json({ error: "L'article ou l'user id n'existe pas dans la BDD." });
        } else {
          res.status(201).json({ message: "Votre Commentaire a été enregistré !" });
        }
      });
    }
  };
  
  exports.getAllCommentaire = (req, res, next) => {
    Commentaire.getAll(req.params.id, (err, result) => {
      console.log(result);
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(201).json(result);
      }
    });
  };
  
  exports.getOneCommentaire = (req, res, next) => {
    Commentaire.getOne(req.params.id, (err, result) => {
      console.log(result);
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(201).json(result);
      }
    });
  };
  
  exports.updateCommentaire = (req, res, next) => {
    if (!req.body.message) {
      res.status(403).json({ error: "Pour modifier votre commentaire, ajouter du contenu."})
    } else {
      const newCommentaire = new Commentaire({
        message: req.body.message
      });
      Commentaire.update(req.params.id, newCommentaire, (err, result) => {
        if (err) {
          res.status(400).json({ error: err });
        } else {
          res.status(201).json({ message: "Commentaire modifié !"});
        }
      });
    }
  };
  
  exports.deleteCommentaire = (req, res, next) => {
    Commentaire.delete(req.params.id, (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(201).json({message: "Commentaire supprimé !"});
      }
    })
  };

  exports.getLastCommentaire = (req, res, next) => {
    Commentaire.last((err, result) => {
      console.log(result);
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(201).json(result);
      }
    });
  };

  exports.totalCommentaire = (req, res, next) => {
    Commentaire.total(req.params.id, (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(201).json(result);
      }
    })
  };