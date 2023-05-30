const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// POST Create a new comments
router.post("/comments", commentController.createComment);

// GET Show All Comments
router.get("/comments", commentController.showAllComments);

// GET Show Specific Comment by Id
router.get("/comments/:id", commentController.getCommentById);

// PUT Edit Comment
router.put("/comments/edit/:id", commentController.editComment);

// Delete
router.delete("/comments/:id", commentController.deleteComment);

module.exports = router;
