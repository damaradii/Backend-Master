const mongoose = require("mongoose");

const borroweedBooksSchema = new mongoose.Schema(
  {
    borrowerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "borrowers",
      required: true,
    },
    bookId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
        required: true,
      },
    ],
    borrowedAt: {
      type: Date,
      required: true,
    },
    lateFee: {
      type: Number,
      require: false,
    },
    expectReturnAt: {
      type: Date,
      required: true,
    },
    returnAt: {
      type: Date,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

const borrowedBooksModels = mongoose.model(
  "BorrowedBooks",
  borroweedBooksSchema
);

module.exports = borrowedBooksModels;
