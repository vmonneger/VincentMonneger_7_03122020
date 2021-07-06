const dbConnection = require('../db/db.config');

const Article = function(article) {
    this.user_id = article.user_id;
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

module.exports = Article;