const express = require("express");
const router = express.Router();

const dbp = require("../posts/postDb");
const dbu = require("./userDb");

router.get("/", async (req, res) => {
  try {
    const users = await req.body;
    dbu.get().then(users => {
      res.status(200).json({ users: users });
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
router.get("/:id", (req, res) => {
  const id = req.params.id;
  dbu
    .getUserPosts(id)
    .then(user => {
      res.status(200).json({ posts: user });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
