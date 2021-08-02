const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


exports.createUser = (req, res, next) => {
  nospecialRegex = /^\S[^*|\":<>[\]{}`\\()';@&$]+$/g;
  nospecialRegex2 = /^\S[^*|\":<>[\]{}`\\()';@&$]+$/g;
  emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g;
  if (!nospecialRegex.test(req.body.nom)) {
    res.status(403).json({ error: "Vous devez renseigner votre nom." }) 
  } else if (!nospecialRegex2.test(req.body.prenom)) {
    res.status(403).json({ error: "Vous devez renseigner votre prénom." }) 
  } else if (!emailRegex.test(req.body.email)) {
    res.status(403).json({ error: "Votre email n'est pas conforme." }) 
  } else if (!passwordRegex.test(req.body.password)) {
    res.status(403).json({ error: "Votre mot de passe doit contenir minimum 8 charactères, une majuscule et un chiffre." }) 
  } else {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const newUser = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: hash,
        admin: 0
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
          token: jwt.sign(
            { user_id: result[0].id,
              admin: result[0].admin },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
          )
        });
      })
      .catch(error => res.status(400).json({ error: error }));
    }
  });
};

exports.getOneUser = (req, res, next) => {
  User.getOne(req.params.id, (err, result) => {
    if (err || !result) {
      res.status(400).json({ error: "Utilisateur introuvable." });
    } else {
      res.status(201).json(result);
    }
  });
};

exports.getAllUser = (req, res, next) => {
  User.getAll((err, result) => {
    if (err) {
      console.log(result);
      res.status(500).json({ error: err });
    } else {
      console.log(result);
      res.status(201).json(result);
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

exports.updateUser = (req, res, next) => {
  User.update(req.params.id, req.body.admin, (err, result) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      if (req.body.admin == 1 ) {
        res.status(201).json({ message: "Il est devenu admin !" });
      } else {
        res.status(201).json({ message: "Il n'est plus admin !" });
      }
    }
  });
};