const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const authorModels = mongoose.model("authors", authorSchema);

module.exports = authorModels;
