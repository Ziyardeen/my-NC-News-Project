const {
  fetchTopics,
  fetchArticleById,
  fetchArticles,
  fetchCommentsByArticleById,
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

  fetchCommentsByArticleById(article_id)
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch((err) => {
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
};
