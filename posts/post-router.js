const express = require("express");
const router = express.Router();

const dbp = require("./postDb");
const dbu = require("../users/userDb");

//middleware

//Routes
router.get("/users/:id", (req, res) => {
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

router.post("/", async (req, res) => {
  try {
    const newPost = await req.body;
    if (newPost.text && newPost.user_id) {
      dbp.insert(newPost).then(post => {
        res.status(201).json(post);
      });
    } else {
      res.status(400).json({ error: "error" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
module.exports = router;
