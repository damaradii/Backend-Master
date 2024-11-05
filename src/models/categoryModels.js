const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    deleteAt: {
      type: Date,
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

const categoryModels = mongoose.model("categories", categorySchema);

module.exports = categoryModels;
