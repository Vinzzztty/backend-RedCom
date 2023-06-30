const mongoose = require("mongoose");

const kategoriSchema = new mongoose.Schema({
    kategori: {
        type: String,
    },
});

const Kategori = mongoose.model("Kategori", kategoriSchema);

module.exports = Kategori;
