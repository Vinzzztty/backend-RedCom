const Posts = require("../models/Post");

// module.exports = {
//     home: async (req, res) => {
//         try {
//             const post = await Posts.find().populate("user");
//             res.render("home", { post });
//             console.log(post);
//         } catch (err) {}
//     },
// };
exports.home = async (req, res) => {
    try {
        const post = await Posts.find().populate("user_id");
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
