const express = require("express");
const {
  healthcheck,
  getTopics,
  getEndpoints,
  getArticleById,
  getArticles,
} = require("./app.controller");

const app = express();

// SERVER HEALTHCHECK
app.get("/api/healthcheck", healthcheck);

//ENDPOINTS MIDDLEWARE
app.get("/api/topics", getTopics);
app.get("/api", getEndpoints);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);

//ERROR HANDLING
/////////////BAD REQUEST

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  }
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(err.status).send({ msg: "Not Found" });
  }
  next(err);
});

///General error handler for wrong endpoint

/////////////INTERNAl ERROR
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
