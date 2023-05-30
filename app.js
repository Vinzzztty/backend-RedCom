require("dotenv").config();

const express = require("express");
const connectDB = require("./server/config/dbConfig");

const userRoutes = require("./server/routes/userRoutes");
const postRoutes = require("./server/routes/postRoutes");
const commentRoutes = require("./server/routes/commentRoutes");
const homeRoutes = require("./server/routes/homeRoutes");

const app = express();
const port = 5000 || process.env.PORT;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/homepage", homeRoutes);

// Homepage rout
// app.get("/", async (req, res) => {
//     try {
//         const postsResponse = await fetch("http://localhost:5000/api/posts");
//         const posts = await postsResponse.json();
//         res.render("home", { posts });
//     } catch (error) {
//         res.status(500).json({
//             error: "Error ketika fetching the posts",
//         });
//     }
// });

// Handle 404
app.get("*", (req, res) => {
    res.status(404).json({
        message: "Not Found",
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
