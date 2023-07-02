const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.home);

router.get("/tes", homeController.tes);

router.post("/search", homeController.search);

router.post("/new-post", homeController.createPost);

router.post("/new-comment", homeController.createComment);

module.exports = router;
