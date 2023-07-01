const JWT = require("jsonwebtoken");

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};

            const secret = process.env.SECRET_TOKEN;
            const options = {
                expiresIn: "15s",
                issuer: "pickurpage.com",
                audience: userId.toString(),
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) reject(err);
                resolve(token);
            });
        });
    },
    verifyAccessToken: (req, res, next) => {
        if (!req.headers["authorization"])
            return res.status(401).json({ error: "Unauthorized" });
        const authHeader = req.headers["authorization"];
        const bearerToken = authHeader.split(" ");
        const token = bearerToken[1];

        JWT.verify(token, process.env.SECRET_TOKEN, (err, payload) => {
            if (err) {
                if (err.name === "JsonWebTokenError") {
                    return res.status(401).json({ error: "Jwt token expired" });
                } else {
                    return res.status(401).json({ error: "Invalid Signature" });
                }
            }
            req.payload = payload;
            next();
        });
    },
    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.REFRESH_TOKEN;
            const options = {
                expiresIn: "1y",
                issuer: "pickurpage.com",
                audience: userId.toString(),
            };

            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject(err);
                }
                resolve(token);
            });
        });
    },

    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(
                refreshToken,
                process.env.REFRESH_TOKEN,
                (err, payload) => {
                    if (err)
                        return reject(
                            res.status(401).json({
                                message: "Unathorized",
                            })
                        );
                    const userId = payload.aud;

                    resolve(userId);
                }
            );
        });
    },
};
