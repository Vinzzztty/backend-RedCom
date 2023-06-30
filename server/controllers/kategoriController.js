const Post = require("../models/Post");
const Kategori = require("../models/Kategori");

// Create new Kategori
exports.createKategori = async (req, res) => {
    try {
        const { kategori } = req.body;
        const kategoris = new Kategori({
            kategori: kategori,
        });

        await kategoris.save();
        res.status(201).json({
            status: "success",
            message: kategoris,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
        });
    }
};

exports.getKategori = async (req, res) => {
    try {
        const kategoris = await Kategori.find();

        res.status(200).json({
            status: "success",
            data: kategoris,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
        });
    }
};
