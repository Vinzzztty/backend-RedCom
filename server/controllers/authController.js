const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const {
            username,
            firstName,
            lastName,
            email,
            gender,
            password,
            is_admin,
        } = req.body;

        const hashPassword = await bcryptjs.hash(password, 8);
        const user = new User({
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            gender: gender,
            password: hashPassword,
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

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid password",
            });
        }

        const token = jwt.sign(
            {
                user: user._id,
            },
            process.env.SECRET_TOKEN
        );

        res.status(200).json({
            message: "User logged in successfully",
            token: token,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
        });
    }
};

exports.logout = async (req, res) => {
    try {
        logoutUser(req, res);
        res.status(200).json({
            message: "User logged out successfully",
            session: req.session,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    } finally {
        // Clear session data
        req.session = null;
    }
};

const logoutUser = (req, res, next) => {
    const token = req.headers["authorization"];
    if (token) {
        jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
            if (err) {
                return err;
            }

            decoded.exp = Date.now();
        });
    }
};
