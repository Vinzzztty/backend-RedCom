const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// Create a new post
router.post("/posts", postController.createPost);

// Get all posts with the comments
router.get("/posts", postController.getPosts);

module.exports = router;
