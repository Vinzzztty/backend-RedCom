const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// POST Create a new comments
router.post("/create", commentController.createComment);

// GET Show All Comments
router.get("/", commentController.showAllComments);

// GET Show Specific Comment by Id
router.get("/:id", commentController.getCommentById);

// PUT Edit Comment
router.put("/edit/:id", commentController.editComment);

// Delete
router.delete("/delete/:id", commentController.deleteComment);

module.exports = router;
