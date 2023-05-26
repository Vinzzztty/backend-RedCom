const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Connect DB
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database Connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`Database no Connected!`, error);
    }
};

module.exports = connectDB;
