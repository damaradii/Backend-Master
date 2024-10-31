const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  stocks: {
    type: number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  deletedAt: {
    type: Date,
    required: false,
    default: null,
  },
});

const booksModel = mongoose.model("books", booksSchema);

module.exports = booksModel;
