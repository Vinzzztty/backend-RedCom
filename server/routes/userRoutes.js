const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// User Routes
// Create a new user
router.post("/users", userController.createUser);

// GET ALL Users
router.get("/users", userController.getAllUser);

// GET Specific User
router.get("/users/:id", userController.getSpecificUser);

// Delete user
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
