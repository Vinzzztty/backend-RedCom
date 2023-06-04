const User = require("../models/User");

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({
            message: "User created successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            error: "Error ketika creating user",
        });
    }
};

/* 
    GET ALL Users
*/

exports.getAllUser = async (req, res) => {
    try {
        const user = await User.find({}, "username email");

        res.status(200).json({
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            error: "Gagal Mendapatkan Semua User",
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
        
        res.status(200).json({
            data: users,
            message: "Successfully GET the User Id",
        });
    } catch (err) {
        if (err.name === "CastError") {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(500).json({
            message: err.message,
        });
    }
};

/**
 * EDIT User by ID
 */

exports.editUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, email, password } = req.body;

        // Find the user by ID and update the fields
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, email, password },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            message: "User Update Successfully",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            error: "Error when edit user",
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
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            error: "Error while delete user",
        });
    }
};
