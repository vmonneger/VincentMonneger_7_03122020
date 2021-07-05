const dbConnection = require('../db/db.config')



const User = function(user) {
    this.nom = user.nom;
    this.prenom = user.prenom;
    this.email = user.email;
    this.password = user.password;
};

User.create = (newUser, result) => {
    dbConnection.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log("User créé !");
            result(null, res);
        }
    });
};

User.login = (email, result) => {
    dbConnection.query("SELECT * FROM users WHERE email = ?", email, (err, res) => {
        if (err || !res.length) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log("Bienvenue !");
            result(null, res);
        }
    });
};

User.delete = (id, result) => {
    dbConnection.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err || res.affectedRows === 0) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log("User supprimé !");
            result(null, res);
        }
    });
};

module.exports = User;