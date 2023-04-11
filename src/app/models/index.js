const dbConfig = require("../../config/dbConfig");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.posts = require("./User");

module.exports = db;
