const Post = require("../models/Post");
const User = require("../models/User");
const Kategori = require("../models/Kategori");
const Comment = require("../models/Comment");
const { verifyAccessToken } = require("../middleware/jwt_helper");

exports.home = async (req, res) => {
    try {
        const post = await Post.find()
            .populate("user_id")
            .populate("kategori_id");
        res.render("home", { post });
        console.log(post);
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "An unexpected error occurred",
        });
    }
};

exports.tes = async (req, res) => {
    try {
        res.status(200).json({
            message: "Masuk",
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "An unexpected error occurred",
        });
    }
};

/**
 * Search Post Data
 */
exports.search = async (req, res) => {
    try {
        let searchPost = req.body.searchPost;
        const searchNoSpecialChar = searchPost.replace(/[^a-zA-Z0-9 ]/g, "");

        const post = await Post.find({
            $or: [
                { content: { $regex: new RegExp(searchNoSpecialChar, "i") } },
            ],
        }).populate("user_id");

        res.render("search", { post });
        return;
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "An unexpected error occurred",
        });
    }
};

/**
 * POST New Post
 */
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

exports.createComment = async (req, res) => {
    try {
        const { text, postId, userId } = req.body;
        const comment = new Comment({ text, post_id: postId, user_id: userId });
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

// exports.sortByKategori = async(req, res) => {
//     let kategoriPost = req.body.kategoriPost

//     const

// }
