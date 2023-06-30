const router = require("express").Router();
const kategoriController = require("../controllers/kategoriController");

router.post("/add", kategoriController.createKategori);
router.get("/", kategoriController.getKategori);

module.exports = router;
