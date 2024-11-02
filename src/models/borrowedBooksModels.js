const mongoose = require("mongoose");

const borroweedBooksSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
    },
    borrowerId: {
      type: String,
      required: true,
    },
    borrowedAt: {
      type: String,
      default: Date,
      required: true,
    },
    expectReturnAt: {
      type: String,
      required: true,
    },
    returnAt: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

const borrowedBooksModels = mongoose.model(
  "borrowedBooks",
  borroweedBooksSchema
);

module.exports = borrowedBooksModels;
