const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// Create a new post
router.post("/posts", postController.createPost);

// Get all posts with the comments
router.get("/homepage", postController.homepage);

// GET POSTS data
router.get("/posts/", postController.getPosts);

// GET Specific Post
router.get("/posts/:id", postController.getSpecificPost);

// PUT Post
router.put("/posts/edit/:id", postController.editPost);

// Delete Post by id
router.delete("/posts/:id", postController.deletePost);

module.exports = router;
