const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    joinAt: {
      type: Date,
      default: Date,
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

const borrowerModels = mongoose.model("borrowers", borrowerSchema);

module.exports = borrowerModels;
