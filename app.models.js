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

function fetchArticles() {
  return db
    .query(
      `SELECT a.author,
     a.title,
     a.article_id,
     a.topic,
     a.created_at,
     a.votes,
     a.article_img_url,
     COUNT(c.comment_id) AS comment_count
    FROM articles a
    LEFT JOIN comments c ON a.article_id = c.article_id
    GROUP BY a.author, a.title, a.article_id, a.topic, a.created_at, a.votes, a.article_img_url
    ORDER BY a.created_at DESC;
     `
    )
    .then(({ rows }) => {
      //   console.log(rows, "<<<<<<<<<<<<<<<<<");
      return rows;
    })
    .catch((err) => {
      return err;
    });
}

module.exports = { fetchTopics, fetchArticleById, fetchArticles };
