const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    pages: {
      type: Number,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    stocks: {
      type: Number,
      required: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true,
      },
    ],
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authors",
      required: true,
    },
    deletedAt: {
      type: Date,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const booksModel = mongoose.model("books", booksSchema);
module.exports = booksModel;
