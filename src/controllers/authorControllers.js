const Authors = require("../models/authorModels");
const { errorMsg, errorName } = require("../utils");
const mongoose = require("mongoose");

const AuthorController = {};

AuthorController.create = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const author = new Authors({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      deletedAt: null,
    });

    await author.save();
    res.status(201).json({
      message: "created",
      data: { Authors: author },
    });
  } catch (error) {
    next(error);
  }
};

AuthorController.upload = async (req, res, next) => {
  try {
    const { photoUrl, id } = req.body;
    if (!photoUrl || !id) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const uploadphotoUrl = await Authors.findByIdAndUpdate(id, { photoUrl });

    if (!uploadphotoUrl) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.AUTHOR_NOT_FOUND,
      };
    }
    res.status(201).json({
      message: "created",
      data: { Authors: uploadphotoUrl },
    });
  } catch (error) {
    next(error);
  }
};

AuthorController.getAll = async (req, res, next) => {
  try {
    const getAuthors = await Authors.find({ isDeleted: false });
    if (!getAuthors) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.AUTHOR_NOT_FOUND,
      };
    }
    res.status(200).json({
      message: "ok",
      data: { Authors: getAuthors },
    });
  } catch (error) {
    next(error);
  }
};

AuthorController.getById = async (req, res, next) => {
  try {
    const getAuthorId = await Authors.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!getAuthorId) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.AUTHOR_NOT_FOUND,
      };
    }
    res.status(200).json({
      message: "ok",
      data: { Authors: getAuthorId },
    });
  } catch (error) {
    next(error);
  }
};

AuthorController.putById = async (req, res, next) => {
  try {
    const { name, email, photoUrl, id } = req.body;

    if (!id || !email || !name) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }
    const updateAuthor = await Authors.findByIdAndUpdate(id, {
      name,
      email,
      photoUrl,
    });
    if (!updateAuthor) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.AUTHOR_NOT_FOUND,
      };
    }
    res.status(200).json({
      message: "Author updated successfully",
      data: updateAuthor,
    });
  } catch (error) {
    next(error);
  }
};

AuthorController.deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const deleteAuthor = await Authors.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      {
        isDeleted: true,
      }
    );
    if (!deleteAuthor) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.AUTHOR_NOT_FOUND,
      };
    }
    res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = AuthorController;
