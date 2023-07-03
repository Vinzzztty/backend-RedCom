const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.home);

router.get("/tes", homeController.tes);

router.get("/search", homeController.search);

router.get("/sort-kategori", homeController.sortByKategori);

router.post("/new-post", homeController.createPost);

router.post("/new-comment", homeController.createComment);

router.get("/comments", homeController.getCommentByIdPost);

module.exports = router;
