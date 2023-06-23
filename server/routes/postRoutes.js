const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// Create a new post
router.post("/create", postController.createPost);

// // Get all posts with the comments
// router.get("/homepage", postController.homepage);

// GET POSTS data
router.get("/", postController.getPosts);

// GET Specific Post
router.get("/:id", postController.getSpecificPost);

// PUT Post
router.put("/edit/:id", postController.editPost);

// Delete Post by id
router.delete("/delete/:id", postController.deletePost);

module.exports = router;
