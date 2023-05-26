const Post = require("../models/Post");
const Comment = require("../models/Comment");

// Create new Post
exports.createPost = async (req, res) => {
    try {
        const { content, type, userId } = req.body;
        const post = new Post({ content, type, user: userId });
        await post.save();
        res.status(201).json({ message: "Post created sucessfully", post });
    } catch (error) {
        res.status(500).json({
            error: "Error ketika membuat post",
        });
    }
};

// Show the Post
exports.getPosts = async (req, res) => {
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
        res.status(200).json(postsWithComments);
    } catch (error) {
        res.status(500).json({
            error: "Error ketika mendapatkan posts",
        });
    }
};
