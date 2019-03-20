const express = require("express");
const router = express.Router();

const db = require("./postDb");

router.get("/", async (req, res) => {
  const posts = await db.get(req.query);
  if (posts) {
    try {
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "There was an error while getting the posts." });
    }
  } else {
    res.status(500).json({ error: "there was an error" });
  }
});
router.post("/", async (req, res) => {
  const newPost = req.body;
  // if (user_id && newPost.text) {
  try {
    db.insert(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
  // }
  // else {
  //   res.status(400).json({
  //     errorMessage: "Please provide title and contents for the post."
  //   });
  // }
});
module.exports = router;
