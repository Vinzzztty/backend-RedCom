const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Kategori = require("../models/Kategori");
const User = require("../models/User");

// Create new Post
exports.createPost = async (req, res) => {
    try {
        const { content, kategoriId, userId } = req.body;

        const userExists = await User.exists({ _id: userId });

        if (!userExists) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }

        const kategoriExists = await Kategori.exists({ _id: kategoriId });

        if (!kategoriExists) {
            return res.status(404).json({
                status: "error",
                message: "Kategori not found",
            });
        }

        const post = new Post({
            content,
            kategori_id: kategoriId,
            user_id: userId,
        });
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
        const posts = await Post.find();

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
exports.getSpecificPost = async (req, res, next) => {
    try {
        const postId = req.params.id;

        // Find Specific Post by Id
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                status: "error",
                message: "Post not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: post,
        });
    } catch (error) {
        next(error);
    }
};

// PUT Edit post
exports.editPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { content, kategoriId } = req.body;

        // Find the post by Id and Update the fields
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { content, kategori_id: kategoriId },
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
