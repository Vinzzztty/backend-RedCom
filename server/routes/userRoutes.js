const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// User Routes
// Create a new user
router.post("/create", userController.createUser);

// GET ALL Users
router.get("/", userController.getAllUser);

// GET Specific User
router.get("/:id", userController.getSpecificUser);

// Edit User
router.put("/edit/:id", userController.editUser);

// Delete user
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
