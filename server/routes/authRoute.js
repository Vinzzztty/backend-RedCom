const express = require("express");
const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/refresh-token", authController.refreshToken);

router.get("/data", authController.getUserDetails);

router.get("/post", authController.getUserPost);

router.post("/logout", authController.logout);

module.exports = router;
