const Post = require("../models/Post");
const Comment = require("../models/Comment");

// Show the Homepage
exports.homepage = async (req, res) => {
    try {
        const posts = await Post.find().populate("user");
        const postsWithComments = await Promise.all(
            posts.map(async (post) => {
                const comments = await Comment.find({
                    post: post._id,
                }).populate("user");
                return {
                    _id: post._id,
                    content: post.content,
                    type: post.type,
                    user: post.user,
                    comments: comments,
                };
            })
        );
        res.status(200).json({ status: "success", postsWithComments });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
        });
    }
};

// Create new Post
exports.createPost = async (req, res) => {
    try {
        const { content, type, userId } = req.body;
        const post = new Post({ content, type, user: userId });
        await post.save();
        res.status(201).json({
            status: "success",
            message: post,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
        });
    }
};

// GET All Posts Data
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}, "content type user createdAt");

        res.status(200).json({
            status: "success",
            data: posts,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
        });
    }
};

// GET Specific Post
exports.getSpecificPost = async (req, res) => {
    try {
        const postId = req.params.id;

        // Find Specific Post by Id
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                error: "Post Not Found",
            });
        }

        res.status(200).json({
            status: "success",
            data: post,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            error: "An unexpected error occurred" || error.message,
        });
    }
};

// PUT Edit post
exports.editPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { content, type } = req.body;

        // Find the post by Id and Update the fields
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { content, type },
            { new: true }
        );

        res.status(200).json({
            status: "success",
            data: updatedPost,
        });
    } catch (error) {
        res.status(500).json({
            status: "successs",
            message: "An unexpected error occurred" || error.message,
        });
    }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        // Delete the post from the databse
        await Post.findByIdAndDelete(postId);

        // await Post.deleteOne({ _id: req.params.id });

        res.status(200).json({
            status: "success",
            message: "Post deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred" || error.message,
        });
    }
};
