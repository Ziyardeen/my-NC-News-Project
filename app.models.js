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
      return rows;
    })
    .catch((err) => {
      return err;
    });
}

function fetchCommentsByArticleById(articleId) {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
      [articleId]
    )
    .then(({ rows }) => {
      return rows;
    });
}

function checkArticleExists(article_id) {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    });
}

function insertComment(article_id, author, body) {
  return db
    .query(
      `INSERT INTO comments (article_id,author,body) VALUES ($1, $2, $3) RETURNING *;`,
      [article_id, author, body]
    )
    .then(({ rows }) => {
      return rows;
    });
}
function updateVotes(article_id, inc_votes) {
  return db

    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
}

function removeCommentById(comment_id) {
  return db.query(`DELETE FROM comments WHERE comment_id = $1`, [comment_id]);
}

function fetchUsers() {
  return db
    .query("SELECT username, name, avatar_url FROM users")
    .then(({ rows }) => {
      return rows;
    });
}
module.exports = {
  fetchTopics,
  fetchArticleById,
  fetchArticles,
  fetchCommentsByArticleById,
  checkArticleExists,
  insertComment,
  updateVotes,
  removeCommentById,
  fetchUsers,
};
