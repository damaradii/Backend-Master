const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
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
    photoUrl: {
      type: String,
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

const authorModels = mongoose.model("authors", authorSchema);

module.exports = authorModels;
