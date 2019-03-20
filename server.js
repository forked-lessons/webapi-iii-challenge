const express = require("express");

const postsRouter = require("./posts/post-router");
const usersRouter = require("./users/users-router");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h2>It's Working!!!</h2>");
});
server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);
module.exports = server;
