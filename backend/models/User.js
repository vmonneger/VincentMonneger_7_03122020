const dbConnection = require('../db/db.config')



const User = function(user) {
    this.nom = user.nom;
    this.prenom = user.prenom;
    this.email = user.email;
    this.password = user.password;
    this.admin = user.admin;
};

User.create = (newUser, result) => {
    dbConnection.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            console.log("User créé !");
            result(null, res);
        }
    });
};

User.login = (email, result) => {
    dbConnection.query("SELECT * FROM users WHERE email = ?", email, (err, res) => {
        // Si array vide renvoie une erreur en vérifiant avec res.length
        if (err || !res.length) {
            console.log("error:", err);
            result(null, err);
        } else {
            console.log("Bienvenue !");
            result(null, res);
        }
    });
};

User.getOne = (id, result) => {
    dbConnection.query("SELECT nom, prenom, email, id, admin FROM users WHERE id = ?", id, (err, res) => {
        // affectedRows si aucune ligne dans la BDD n'a été supprimé
        if (err || res.affectedRows === 0) {
            console.log(err);
            result(null, err);
        } else {
            console.log("User supprimé !");
            result(null, res);
        }
    });
};

User.getAll = (result) => {
    dbConnection.query("SELECT id, nom, prenom, email FROM users", (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            console.log("Les users sont affichés.");
            result(null, res);
        }
    })
};

User.delete = (id, result) => {
    dbConnection.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        // affectedRows si aucune ligne dans la BDD n'a été supprimé
        if (err || res.affectedRows === 0) {
            console.log(err);
            result(null, err);
        } else {
            console.log("User supprimé !");
            result(null, res);
        }
    });
};

User.update = (id, newAdmin, result) => {
    dbConnection.query("UPDATE users SET admin = ? WHERE id = ?", 
    [newAdmin, id], (err, res) => {
        if (err) {
            console.log(err);
            console.log(newAdmin);
            result(null, err);
        } else {
            console.log(res);
            result(null, res);
        }
    })
};

module.exports = User;
