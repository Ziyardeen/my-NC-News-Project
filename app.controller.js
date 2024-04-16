const fetchTopics = require("./app.models");
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
module.exports = { healthcheck, getTopics, getEndpoints };
