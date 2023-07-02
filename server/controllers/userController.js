const User = require("../models/User");
const bcryptjs = require("bcryptjs");

exports.createUser = async (req, res) => {
    try {
        const { username, email, password, profilePictureUrl, is_admin } =
            req.body;

        const hashPassword = await bcryptjs.hash(password, 8);
        const user = new User({
            username: username,
            email: email,
            password: hashPassword,
            profilePictureUrl: profilePictureUrl,
            is_admin: is_admin,
        });
        await user.save();
        res.status(201).json({
            message: "User created successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
        });
    }
};

/* 
    GET ALL Users
*/

exports.getAllUser = async (req, res) => {
    try {
        const user = await User.find({}, "firstName username email is_admin");

        res.status(200).json({
            status: "success",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
        });
    }
};

/*
    GET Specific User by Id
*/

exports.getSpecificUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find Specific User by Id
        const users = await User.findOne({ _id: id });

        try {
        } catch {
            res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }

        if (!users) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }
        res.status(200).json({
            status: "success",
            data: users,
        });
    } catch (err) {
        res.status(404).json({
            status: "error",
            message: "User Not Found" || err.message,
        });
    }
};

/**
 * EDIT User by ID
 */

exports.editUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, email, profilePictureUrl, password } = req.body;

        // Find the user by ID and update the fields
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                username,
                email,
                profilePictureUrl,
                password,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            status: "success",
            data: updatedUser,
        });
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "User not found" || error.message,
        });
    }
};

/*
    DELETE User
*/
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Delete the user from the database
        await User.findByIdAndDelete(userId);

        res.status(200).json({
            status: "success",
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(404).json({
            error: "user not found" || error.message,
        });
    }
};
