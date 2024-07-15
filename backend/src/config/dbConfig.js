const mongoose = require("mongoose");

const dbConfig = "mongodb://127.0.0.1:27017/arthur";

const connection = mongoose.connect(dbConfig);

module.exports = connection;
