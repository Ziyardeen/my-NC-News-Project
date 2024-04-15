const express = require("express");
const { healthcheck, getTopics } = require("./app.controller");

const app = express();

// SERVER HEALTHCHECK
app.get("/api/healthcheck", healthcheck);

//ENDPOINTS MIDDLEWARE
app.get("/api/topics", getTopics);

//ERROR HANDLING

/////////////BAD REQUEST
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: "Resourse Not Found" });
  }
  next(err);
});

/////////////INTERNAl ERROR
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
