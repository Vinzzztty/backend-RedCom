require("dotenv").config();

const express = require("express");
const connectDB = require("./server/config/dbConfig");
const cors = require("cors");

const userRoutes = require("./server/routes/userRoutes");
const postRoutes = require("./server/routes/postRoutes");
const commentRoutes = require("./server/routes/commentRoutes");
const homeRoutes = require("./server/routes/homeRoutes");
const kategoriRoutes = require("./server/routes/kategoriRoute");

const authRoutes = require("./server/routes/authRoute");

const app = express();
const port = 5000 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/homepage", homeRoutes, (req, res, next) => {
    // Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
    );
    next();
});

app.use("/api/kategori", kategoriRoutes);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello World",
    });
});

// Handle 404
// app.get("*", (req, res) => {
//     res.status(404).json({
//         message: "Not Found",
//     });
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
