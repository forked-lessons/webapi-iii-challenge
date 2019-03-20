const express = require("express");
const router = express.Router();

const dbp = require("./postDb");
const dbu = require("../users/userDb");

//middleware

//Routes

router.get("/", async (req, res) => {
  try {
    const posts = await req.body;
    dbp.get().then(posts => {
      res.status(200).json({ posts: posts });
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = await req.params.id;
    dbp.getById(id).then(posts => {
      res.status(200).json({ posts: posts });
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
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

router.delete("/:id", async (req, res) => {
  try {
    const post = req.params.id;
    await dbp.remove(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const changes = req.body;
    const id = req.params.id;
    const post = await dbp.update(id, changes);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "the post could not be found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
module.exports = router;
