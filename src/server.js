const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models/");

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database Connected!");
    })
    .catch((err) => {
        console.log(`Cannot connect to the database!`, err);
        process.exit();
    });

app.get("/", (req, res) => {
    console.log("here");
    res.send("hi");
});

const PORT = 3100;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
