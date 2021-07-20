const dbConnection = require('../db/db.config');

const Commentaire = function(commentaire) {
    this.article_id = commentaire.article_id
    this.user_id = commentaire.user_id;
    this.message = commentaire.message;
    this.date = new Date();
};

Commentaire.create = (newCommentaire, result) => {
    dbConnection.query("INSERT INTO commentaires SET ?", newCommentaire, (err, res) => {
        if (err){
            console.log(err);
            result(null, err);
        } else {
            console.log("Commentaire posté !");
            result(null, res);
        }
    });
};

Commentaire.getAll = (id, result) => {
    dbConnection.query("SELECT * FROM commentaires WHERE article_id = ?", id, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            console.log(res);
            result(null, res);
        }
    })
};

Commentaire.getOne = (id, result) => {
    dbConnection.query("SELECT * FROM commentaires WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            console.log(res);
            result(null, res);
        }
    })
};

Commentaire.update = (id, newCommentaire, result) => {
    dbConnection.query("UPDATE commentaires SET message = ? WHERE id = ?", 
    [newCommentaire.message, id], (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            console.log(res);
            result(null, res);
        }
    })
};

Commentaire.delete = (id, result) => {
    dbConnection.query("DELETE FROM commentaires WHERE id = ?", id, (err, res) => {
        if (err || res.affectedRows === 0) {
            console.log(err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
};

module.exports = Commentaire;