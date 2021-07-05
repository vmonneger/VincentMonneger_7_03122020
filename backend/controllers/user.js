const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const newUser = new User({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      password: hash
    })
    // Requete valide si l'objet est inferieur au 4 colonnes de la db erreur
    if (req.body.constructor === Object && Object.keys(req.body).length < 4) {
      res.status(400).json({ error: "Vous devez remplir tous les champs." }) 
    } else {
      User.create(newUser, (err, result) => {
        if (err) {
          res.status(500).json({ error: err });
        }
        res.status(201).json({ message: "Utilisateur enregistré !", data: result });
      });
    }
  })
  .catch(error => res.status(500).json({ error: "Veuillez choisir votre mot de passe." }));
};

exports.loginUser = (req, res, next) => {
  User.login(req.body.email, (err, result) => {
    if (err || !result || req.body.email === "") {
      res.status(500).json({ error: "Email invalide." });
    } else {
      bcrypt.compare(req.body.password, result[0].password)
      .then(valid => {
        if (!valid) {
          res.status(401).json({ error: "Mot de passe incorect." });
        }
        res.status(201).json({
          userId: result[0].id, 
          token: jwt.sign(
            { userId: result[0].id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
          )
        });
      })
      .catch(error => res.status(400).json({ error: error }));
    }
  });
};

exports.deleteUser = (req, res, next) => {
  User.delete(req.params.id, (err, result) => {
    if (err || !result) {
      res.status(400).json({ error: "Utilisateur introuvable." });
    } else {
      console.log("control user supp")
      res.status(201).json({ message: "Utilisateur supprimé !" });
    }
  });
};