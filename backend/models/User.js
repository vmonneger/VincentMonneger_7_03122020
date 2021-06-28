const sql = require('../app.js');

const User = (user) => {
    this.nom = user.nom;
    this.prenom = user.prenom;
    this.email = user.email;
    this.password = user.password;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            console.log("created customer: ", { id: res.insertId, ...newCustomer });
            result(null, { id: res.insertId, ...newCustomer })
        }
    });
};