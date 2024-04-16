const db = require("./db/connection");

function fetchTopics() {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
}

function fetchArticleById(aritcleId) {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [aritcleId])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return rows[0];
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

module.exports = { fetchTopics, fetchArticleById };
