const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: [
            "Science",
            "Computer",
            "Math",
            "Programming",
            "History",
            "Other",
        ],
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
