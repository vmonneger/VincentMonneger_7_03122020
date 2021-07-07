const dbConnection = require('../db/db.config');

const Article = function(article) {
    this.user_id = article.user_id;
    this.titre = article.titre;
    this.contenu = article.contenu;
    this.date = new Date()
};

Article.create = (newArticle, result) => {
    dbConnection.query("INSERT INTO articles SET ?", newArticle, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            console.log("Article créé !");
            result(null, res);
        }
    });
};

Article.getAll = (result) => {
    dbConnection.query("SELECT * FROM articles", (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            console.log("Les articles sont affichés.");
            result(null, res);
        }
    })
};

Article.getOne = (id, result) => {
    dbConnection.query("SELECT * FROM articles WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            console.log(res);
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
            console.log(res);
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

module.exports = Article;