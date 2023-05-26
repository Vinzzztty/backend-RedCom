const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// User Routes
// Create a new user
router.post("/users", userController.createUser);

module.exports = router;
