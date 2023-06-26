const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.home);

router.get("/tes", homeController.tes);

router.post("/search", homeController.search);

module.exports = router;
