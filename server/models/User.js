const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePictureUrl: {
            type: String,
        },
        is_admin: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: {
            createdAt: "crdAt",
            updatedAt: "upAt",
        },
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
