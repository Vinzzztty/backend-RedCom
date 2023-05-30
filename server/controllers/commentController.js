const Comment = require("../models/Comment");

// Create a new comment
exports.createComment = async (req, res) => {
    try {
        const { text, postId, userId } = req.body;
        const comment = new Comment({ text, post: postId, user: userId });
        await comment.save();
        res.status(201).json({
            message: "Comment created successfully",
            comment,
        });
    } catch (error) {
        res.status(500).json({
            error: "Error ketika creating comments",
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
            data: comments,
        });
    } catch (error) {
        res.status(500).json({
            error: "Error ketika mendapatkan data Comments",
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
            data: comment,
            message: "Successfully GET the Comment Id",
        });
    } catch (error) {
        res.status(500).json({
            error: "Error ketika mendapatkan data comment",
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
            message: "Comment Update Successfully",
            data: updatedComment,
        });
    } catch (error) {
        res.status(500).json({
            error: "Error ketika mendapatkan data Comment",
        });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;

        // Delete the comment from the database
        await Comment.findByIdAndDelete(commentId);

        res.status(200).json({
            message: "Comment deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            error: "Error ketika deleting comment",
        });
    }
};
