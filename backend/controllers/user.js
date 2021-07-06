const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


exports.createUser = (req, res, next) => {
  if (!req.body.nom) {
    res.status(403).json({ error: "Vous devez renseigner votre nom." }) 
  } else if (!req.body.prenom) {
    res.status(403).json({ error: "Vous devez renseigner votre prénom." }) 
  } else if (!req.body.email) {
    res.status(403).json({ error: "Vous devez renseigner votre email." }) 
  } else if (!req.body.password) {
    res.status(403).json({ error: "Vous devez renseigner votre mot de passe." }) 
  } else {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const newUser = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: hash
      })
      User.create(newUser, (err, result) => {
        // Erreur de duplication mysql 1062
        if (err || result.errno === 1062) {
          res.status(400).json({ error: "Cet email est déjà utilisé." });
        } else {
          res.status(201).json({ message: "Utilisateur enregistré !" });
        }
      });
    })
    .catch(error => res.status(500).json({ error: "Erreur cryptage." }));
  }
};

exports.loginUser = (req, res, next) => {
  User.login(req.body.email, (err, result) => {
    if (err || !result || !req.body.email) {
      res.status(400).json({ error: "Email invalide." });
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
      res.status(201).json({ message: "Utilisateur supprimé !" });
    }
  });
};