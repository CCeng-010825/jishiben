const mongoose = require("mongoose");

let bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
});
let BookModel = mongoose.model("books", bookSchema);
module.exports = BookModel;
