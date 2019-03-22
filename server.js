const express = require("express");

const postsRouter = require("./posts/post-router");
const usersRouter = require("./users/users-router");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h2>It's Working!!!</h2>");
});

function formatting(req, res, next) {
  const user = req.body;
  req.body.name = user.name
    .toLowerCase()
    .split(" ")
    .map(i => i.charAt(0).toUpperCase() + i.substring(1))
    .join(" ");
  next();
}

server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);
module.exports = server;
