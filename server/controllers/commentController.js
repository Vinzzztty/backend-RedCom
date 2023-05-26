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
