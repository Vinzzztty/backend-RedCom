const Post = require("../models/Post");
const User = require("../models/User");
const Kategori = require("../models/Kategori");
const Comment = require("../models/Comment");
const { verifyAccessToken } = require("../middleware/jwt_helper");
const { formatDate, formatTime } = require("../utils/formattedDate");

exports.home = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user_id")
            .populate("kategori_id")
            .sort({ crdAt: -1 });

        if (!posts) {
            return res.status(404).json({
                status: "error",
                message: "Post Not Found",
            });
        }

        const formattedPosts = posts.map((post) => {
            const formattedCreatedAtDate = formatDate(post.crdAt);
            const formattedCreatedAtTime = formatTime(post.crdAt);

            return {
                _id: post._id,
                content: post.content,
                kategori_id: post.kategori_id,
                user_id: post.user_id,
                date_created: formattedCreatedAtDate,
                time: formattedCreatedAtTime,
            };
        });

        res.status(200).json({
            status: "success",
            data: formattedPosts,
        });
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
        let searchPost = req.query.searchPost;
        const searchNoSpecialChar = searchPost.replace(/[^a-zA-Z0-9 ]/g, "");

        const posts = await Post.find({
            $or: [
                { content: { $regex: new RegExp(searchNoSpecialChar, "i") } },
            ],
        })
            .populate("user_id")
            .populate("kategori_id")
            .sort({ crdAt: -1 });

        if (posts.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Post Not Found",
            });
        }

        const formattedPosts = posts.map((post) => {
            const formattedCreatedAtDate = formatDate(post.crdAt);
            const formattedCreatedAtTime = formatTime(post.crdAt);

            return {
                _id: post._id,
                content: post.content,
                kategori_id: post.kategori_id,
                user_id: post.user_id,
                date_created: formattedCreatedAtDate,
                time: formattedCreatedAtTime,
            };
        });

        // res.render("search", { post });
        res.status(200).json({
            status: "Success",
            data: formattedPosts,
        });
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
        verifyAccessToken(req, res, async (err) => {
            if (err) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            const { content, kategoriId } = req.body;

            const userId = req.payload.aud;

            const user = await User.findOne({ _id: userId });

            if (!user) {
                return res.status(404).json({
                    status: "error",
                    message: "user not found",
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
        verifyAccessToken(req, res, async (err) => {
            if (err) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            const { text, postId } = req.body;

            const userId = req.payload.aud;

            const user = await User.findOne({ _id: userId });

            if (!user) {
                return res.status(404).json({
                    status: "error",
                    message: "user not found",
                });
            }
            const comment = new Comment({
                text,
                post_id: postId,
                user_id: userId,
            });
            await comment.save();

            res.status(201).json({
                status: "success",
                message: "Comment created successfully",
                comment,
            });
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
        });
    }
};

exports.sortByKategori = async (req, res) => {
    try {
        const kategoriPost = req.query.kategoriPost;

        // Find the kategori by name
        const kategori = await Kategori.findOne({
            kategori: kategoriPost,
        });

        // If kategori is not found, return an error response
        if (!kategori) {
            return res.status(404).json({
                status: "error",
                message: "Kategori not found",
            });
        }

        // Find all posts with the given kategori_id
        const posts = await Post.find({ kategori_id: kategori._id })
            .populate("user_id")
            .populate("kategori_id")
            .sort({ crdAt: -1 })
            .exec();

        // If no posts are found, return an error response
        if (posts.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Not Post with this Kategori",
            });
        }

        const formattedPosts = posts.map((post) => {
            const formattedCreatedAtDate = formatDate(post.crdAt);
            const formattedCreatedAtTime = formatTime(post.crdAt);

            return {
                _id: post._id,
                content: post.content,
                kategori_id: post.kategori_id,
                user_id: post.user_id,
                date_created: formattedCreatedAtDate,
                time: formattedCreatedAtTime,
            };
        });

        // Return the sorted posts as the response
        res.status(200).json({
            status: "success",
            data: formattedPosts,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred" + error.message,
        });
    }
};

exports.getCommentByIdPost = async (req, res) => {
    try {
        const postId = req.query.postId;

        // Find Specific Comment by Post Id and populate user and post
        const comments = await Comment.find({ post_id: postId }).populate({
            path: "user_id",
            select: "username",
        });

        const transformedComments = comments.map((comment) => {
            return {
                _id: comment._id,
                text: comment.text,
                username: comment.user_id.username,
            };
        });

        res.status(200).json({
            status: "success",
            data: transformedComments,
        });
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "Comment id not found" || error.message,
        });
    }
};
