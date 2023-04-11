const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    console.log("here");
    res.send("hi");
});

const PORT = 3100;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
