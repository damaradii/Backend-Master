const Authors = require("../models/authorModels");
const { errorMsg, errorName } = require("../utils");

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
      name,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    await author.save();
    res.status(201).json(author);
  } catch (error) {
    next(error);
  }
};

AuthorController.upload = async (req, res, next) => {
  try {
    const { photoUrl } = req.body;
    if (!photoUrl) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const uploadphotoUrl = await Authors.findByIdAndUpdate(
      req.params.id,
      { $set: { photoUrl } },
      { new: true }
    );

    if (!uploadphotoUrl) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BOOK_NOT_FOUND,
      };
    }
    res.status(200).json(uploadphotoUrl);
  } catch (error) {
    next(error);
  }
};

AuthorController.getAll = async (req, res, next) => {
  try {
    const getAuthors = await Authors.find();
    if (!getAuthors) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.AUTHOR_NOT_FOUND,
      };
    }
    res.status(200).json(getAuthors);
  } catch (error) {
    next(error);
  }
};

AuthorController.getById = async (req, res, next) => {
  try {
    const getAuthorId = await Authors.findById(req.params.id);
    if (!getAuthorId) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.AUTHOR_NOT_FOUND,
      };
    }
    res.status(200).json(getAuthorId);
  } catch (error) {
    next(error);
  }
};

AuthorController.putById = async (req, res, next) => {
  try {
    const { name, email, photoUrl } = req.body;

    if (!name || !email || !photoUrl) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }
    const updateAuthor = await Authors.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updateAuthor) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.AUTHOR_NOT_FOUND,
      };
    }
    res.status(201).json(updateAuthor);
  } catch (error) {
    next(error);
  }
};

AuthorController.deleteById = async (req, res, next) => {
  try {
    const deleteAuthor = await Authors.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!deleteAuthor) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.AUTHOR_NOT_FOUND,
      };
    }
    res.status(200).json(deleteAuthor);
  } catch (error) {
    next(error);
  }
};

module.exports = AuthorController;
