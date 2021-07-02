const sql = require('../app.js');

exports.dbQuery = (dbSql) => {
    return new Promise((resolve, reject) => {
        sql.query(dbSql, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};