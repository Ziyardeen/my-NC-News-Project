const {
  fetchTopics,
  fetchArticleById,
  fetchArticles,
  fetchCommentsByArticleById,
  checkArticleExists,
  insertComment,
  updateVotes,
  removeCommentById,
  fetchUsers,
} = require("./app.models");
const endpoints = require("./endpoints.json");

function healthcheck(req, res, next) {
  res.status(200).send({ msg: "Server Connection Establised" });
}
function getTopics(req, res, next) {
  fetchTopics()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function getEndpoints(req, res, next) {
  res.status(200).send(endpoints);
}

function getArticleById(req, res, next) {
  const article_id = req.params.article_id;

  fetchArticleById(article_id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function getArticles(req, res, next) {
  fetchArticles()
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch((err) => {
      next(err);
    });
}

function getCommentsByArticleById(req, res, next) {
  const { article_id } = req.params;

  Promise.all([
    fetchCommentsByArticleById(article_id),
    checkArticleExists(article_id),
  ])
    .then(([comments]) => {
      res.status(200).send(comments);
    })
    .catch((err) => {
      next(err);
    });
}

function postCommentByArticleId(req, res, next) {
  const { article_id } = req.params;
  const { username, body } = req.body;

  if (!username || !body) {
    return res.status(400).send({ msg: "Bad request" });
  }

  insertComment(article_id, username, body)
    .then(([data]) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function patchArticleById(req, res, next) {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  if (!inc_votes) {
    res.status(400).send({ msg: "Bad request" });
  }

  updateVotes(article_id, inc_votes)
    .then((data) => {
      if (data.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function deleteCommentById(req, res, next) {
  const { comment_id } = req.params;

  Promise.all([removeCommentById(comment_id), checkArticleExists(comment_id)])
    .then((data) => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
}

function getUsers(req, res, next) {
  fetchUsers()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}
module.exports = {
  healthcheck,
  getTopics,
  getEndpoints,
  getArticleById,
  getArticles,
  getCommentsByArticleById,
  postCommentByArticleId,
  patchArticleById,
  deleteCommentById,
  getUsers,
};
