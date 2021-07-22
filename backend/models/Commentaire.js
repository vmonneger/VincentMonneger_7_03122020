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
    dbConnection.query("SELECT commentaires.*, users.nom, users.prenom, users.email FROM commentaires LEFT JOIN users on commentaires.user_id = users.id WHERE article_id = ?", id, (err, res) => {
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
    dbConnection.query("SELECT commentaires.*, articles.titre FROM commentaires INNER JOIN articles on commentaires.article_id = articles.id WHERE commentaires.user_id = ?", id, (err, res) => {
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

Commentaire.lastId = (result) => {
    dbConnection.query("SELECT MAX(id) AS last_id FROM commentaires", (err, res) => {
        if (err || res.affectedRows === 0) {
            console.log(err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
};

Commentaire.last = (result) => {
    dbConnection.query("SELECT commentaires.*, users.nom, users.prenom, articles.titre FROM commentaires INNER JOIN articles ON commentaires.article_id = articles.id INNER JOIN users ON commentaires.user_id = users.id WHERE commentaires.id =(SELECT MAX(id) FROM commentaires)", (err, res) => {
        if (err || res.affectedRows === 0) {
            console.log(err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
};

Commentaire.total = (id, result) => {
    dbConnection.query("SELECT COUNT(*) AS total FROM commentaires WHERE article_id = ?", id, (err, res) => {
        if (err || res.affectedRows === 0) {
            console.log(err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
};

module.exports = Commentaire;