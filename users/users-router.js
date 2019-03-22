const express = require("express");
const router = express.Router();
const dbu = require("./userDb");
const formatting = require("../server");
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

router.post("/", async (req, res) => {
  try {
    const newUser = await req.body;
    dbu.insert(newUser).then(name => {
      res.status(201).json(name);
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await dbu.remove(id).then(removal => {
      res.status(200).json(removal);
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const changes = req.body;
    const id = req.params.id;
    const user = await dbu.update(id, changes);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "the user could not be found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
module.exports = router;
