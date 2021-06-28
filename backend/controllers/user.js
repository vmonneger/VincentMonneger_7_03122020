const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// exports.signup = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10)
//     .then(hash => {
//         const user = new User({
//             nom: req.body.nom,
//             prenom: req.body.prenom,
//             email: req.body.email,
//             password: hash 
//         });
//         Customer.create(customer, (err, data) => {
//             if (err)
//               res.status(500).send({
//                 message:
//                   err.message || "Some error occurred while creating the Customer."
//               });
//             else res.send(data);
//         });
//     })
//     .catch(error => res.status(500).json({ error }));
// };

// exports.login = (req, res, next) => {

// };
exports.signup = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const user = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: req.body.password
    });
  
    // Save Customer in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
  };