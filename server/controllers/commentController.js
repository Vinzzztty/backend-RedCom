const Comment = require("../models/Comment");

// Create a new comment
exports.createComment = async (req, res) => {
    try {
        const { text, postId, userId } = req.body;
        const comment = new Comment({ text, post: postId, user: userId });
        await comment.save();
        res.status(201).json({
            status: "success",
            message: "Comment created successfully",
            comment,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
        });
    }
};

/**
 * GET
 * All Comments
 */

exports.showAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();

        res.status(200).json({
            status: "success",
            data: comments,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
        });
    }
};

/**
 * GET
 * Specific Comment by Id
 */

exports.getCommentById = async (req, res) => {
    try {
        const commentId = req.params.id;

        // Find Specific Comment by Id
        const comment = await Comment.findById(commentId);

        res.status(200).json({
            status: "success",
            data: comment,
        });
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "Comment id not found" || error.message,
        });
    }
};

/**
 * PUT
 * Edit Specific Comment
 */
exports.editComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const { text } = req.body;

        // Find the comment by Id and update the fields
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { text },
            { new: true }
        );

        res.status(200).json({
            status: "success",
            data: updatedComment,
        });
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "Comment id not found" || error.message,
        });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;

        // Delete the comment from the database
        await Comment.findByIdAndDelete(commentId);

        res.status(200).json({
            status: "success",
            message: "Comment deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
        });
    }
};
