const Books = require("../models/booksModels");
const { errorMsg, errorName } = require("../utils");
const mongoose = require("mongoose");

const BooksController = {};

BooksController.create = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const {
      title,
      pages,
      summary,
      stocks = 0,
      authorId,
      categoryId = [],
    } = req.body;
    //cek falsy input
    if (!title || !pages || !summary || !stocks || !authorId || !categoryId) {
      // bad request
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }
    const book = new Books({
      _id: new mongoose.Types.ObjectId(),
      title,
      summary,
      pages,
      categoryId: categoryId,
      authorId: authorId,
      stocks,
      deletedAt: null,
    });
    await session.commitTransaction();
    await book.save({ session });
    res.status(201).json({
      message: "created",
      data: { Books: book },
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

BooksController.upload = async (req, res, next) => {
  try {
    const { imageUrl, id } = req.body;
    if (!imageUrl || !id) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const uploadBooksUrl = await Books.findByIdAndUpdate(id, { imageUrl });

    if (!uploadBooksUrl) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BOOK_NOT_FOUND,
      };
    }
    res.status(201).json({
      message: "created",
      data: { Books: uploadBooksUrl },
    });
  } catch (error) {
    next(error);
  }
};

BooksController.getAll = async (req, res, next) => {
  try {
    const getBooks = await Books.find({ isDeleted: false })
      .populate("authorId", "_id name")
      .populate("categoryId", "_id name");
    if (!getBooks) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BOOK_NOT_FOUND,
      };
    }
    res.status(200).json({
      message: "ok",
      data: { Books: getBooks },
    });
  } catch (error) {
    next(error);
  }
};

BooksController.getById = async (req, res, next) => {
  try {
    const getBookId = await Books.findOne({
      _id: req.params.id,
      isDeleted: false,
    })
      .populate("authorId", "_id name")
      .populate("categoryId", "_id name");

    if (!getBookId) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BOOK_NOT_FOUND,
      };
    }

    res.status(200).json({
      message: "ok",
      data: { Books: getBookId },
    });
  } catch (error) {
    next(error);
  }
};

BooksController.putById = async (req, res, next) => {
  try {
    const {
      title,
      pages,
      summary,
      stocks,
      authorId,
      categoryId,
      id,
      imageUrl,
    } = req.body;
    //cek falsy input
    if (
      !title ||
      !pages ||
      !summary ||
      !stocks ||
      !authorId ||
      !categoryId ||
      !id
    ) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const updateBook = await Books.findByIdAndUpdate(id, {
      title,
      pages,
      summary,
      stocks,
      imageUrl,
      authorId,
      categoryId,
    });

    if (!updateBook) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BOOK_NOT_FOUND,
      };
    }
    res.status(200).json({
      message: "Book updated successfully",
      data: updateBook,
    });
  } catch (error) {
    next(error);
  }
};

BooksController.deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }
    const deleteBook = await Books.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      {
        isDeleted: true,
        deletedAt: new Date(),
      }
    );
    if (!deleteBook) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BOOK_NOT_FOUND,
      };
    }
    res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = BooksController;
