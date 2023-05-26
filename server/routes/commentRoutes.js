const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Create a new post
router.post("/comments", commentController.createComment);

module.exports = router;
