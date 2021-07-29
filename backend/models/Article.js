const dbConnection = require('../db/db.config');

const Article = function(article) {
    this.user_id = article.user_id;
    this.titre = article.titre;
    this.contenu = article.contenu;
    this.date = new Date()
    this.image = article.image
};

Article.create = (newArticle, result) => {
    dbConnection.query("INSERT INTO articles SET ?", newArticle, (err, res) => {
        if (err || result.errno === 1406) {
            console.log(err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Article.getAll = (result) => {
    dbConnection.query("SELECT articles.*, users.nom, users.prenom, COUNT(commentaires.article_id) AS nbre_comm, MAX(commentaires.date) AS last_comm FROM articles INNER JOIN users ON articles.user_id = users.id LEFT JOIN commentaires ON commentaires.article_id = articles.id GROUP BY articles.id ORDER BY articles.date DESC;", (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
};

Article.getOne = (id, result) => {
    dbConnection.query("SELECT articles.*, users.nom, users.prenom FROM articles INNER JOIN users on articles.user_id = users.id WHERE articles.id = ?", id, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
};

Article.getAllUser = (id, result) => {
    dbConnection.query("SELECT * FROM articles WHERE user_id = ?", id, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
};

Article.update = (id, newArticle, result) => {
    dbConnection.query("UPDATE articles SET titre = ?, contenu = ? WHERE id = ?", 
    [newArticle.titre, newArticle.contenu, id], (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
};

Article.delete = (id, result) => {
    dbConnection.query("DELETE FROM articles WHERE id = ?", id, (err, res) => {
        if (err || res.affectedRows === 0) {
            console.log(err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
};

Article.total = (result) => {
    dbConnection.query("SELECT COUNT(*) AS total FROM articles", (err, res) => {
        if (err || res.affectedRows === 0) {
            console.log(err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
};

module.exports = Article;