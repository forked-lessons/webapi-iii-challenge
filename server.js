const express = require("express");

const postsRouter = require("./posts/post-router");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h2>It's Working!!!</h2>");
});
server.use("/api", postsRouter);
module.exports = server;
