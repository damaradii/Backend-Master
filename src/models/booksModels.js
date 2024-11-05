const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
    },
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
    categoryId: [
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const booksModel = mongoose.model("books", booksSchema);
module.exports = booksModel;
