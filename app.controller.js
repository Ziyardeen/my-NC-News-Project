const {
  fetchTopics,
  fetchArticleById,
  fetchArticles,
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
  next();
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
  const resourse = req.url.split("/")[req.url.split("/").length - 1];
  console.log(resourse);
  if (resourse !== "articles") {
    console.log("hello");
    res.status(404).send({ msg: "Not Found" });
  }

  fetchArticles()
    .then((articles) => {
      res.status(200).send(articles);
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
};
