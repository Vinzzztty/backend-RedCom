const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
} = require("../middleware/jwt_helper");

exports.signup = async (req, res) => {
    try {
        const { username, email, password, is_admin } = req.body;

        const doesExist = await User.findOne({ email: email });
        if (doesExist) {
            return res.json({
                msg: `${email} is already been registered`,
            });
        }

        const hashPassword = await bcryptjs.hash(password, 8);
        const user = new User({
            username: username,
            email: email,
            password: hashPassword,
            is_admin: is_admin,
        });
        await user.save();

        const accessToken = await signAccessToken(user._id);
        const refreshToken = await signRefreshToken(user._id);

        res.status(201).json({
            message: "User created successfully",
            access_token: { accessToken },
            refresh_token: { refreshToken },
            user,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                message: "Email not found",
            });
        }

        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid password",
            });
        }

        const accessToken = await signAccessToken(user._id);
        const refreshToken = await signRefreshToken(user._id);

        res.status(200).json({
            message: "User logged in successfully",
            access_token: accessToken,
            refresh_token: refreshToken,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
        });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken)
            throw res.status(404).json({
                message: "Bad Request",
            });
        const userId = await verifyRefreshToken(refreshToken);

        const accessToken = await signAccessToken(userId);
        const refToken = await signRefreshToken(userId);

        res.send({ accessToken, refToken });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};

exports.getUserPost = async (req, res) => {
    try {
        verifyAccessToken(req, res, async (err) => {
            if (err) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const userId = req.payload.aud;

            const user = await User.findOne({ _id: userId });

            if (!user) {
                return res.status(404).json({
                    status: "error",
                    message: "user not found",
                });
            }

            res.status(200).json({
                status: "success",
                data: user,
            });
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
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
