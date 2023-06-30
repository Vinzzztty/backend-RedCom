const Posts = require("../models/Post");

exports.home = async (req, res) => {
    try {
        const post = await Posts.find()
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

        const post = await Posts.find({
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
