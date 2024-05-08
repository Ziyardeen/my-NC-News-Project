const express = require("express");
const {
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
} = require("./app.controller");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// const corsOptions = {
//   origin: ["http://localhost:5173/", "http://localhost:5173"],
//   allowedMethods: ["GET", "POST", "PATCH"],
// };

// SERVER HEALTHCHECK
app.get("/api/healthcheck", healthcheck);

//ENDPOINTS MIDDLEWARE
app.get("/api/topics", getTopics);
app.get("/api", getEndpoints);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getCommentsByArticleById);
app.post("/api/articles/:article_id/comments", postCommentByArticleId);
app.patch("/api/articles/:article_id", patchArticleById);
app.delete("/api/comments/:comment_id", deleteCommentById);
app.get("/api/users", getUsers);

//ERROR HANDLING

/////////////BAD REQUEST

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  }
  next(err);
});
app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "Username Not found" });
  }
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
});
app.use((err, req, res, next) => {
  if (err.status === 400) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
});

/////////////INTERNAl ERROR
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
