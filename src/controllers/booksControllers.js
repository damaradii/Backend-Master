const Books = require("../models/booksModels");
const { errorMsg, errorName } = require("../utils");

const BooksController = {};

BooksController.create = async (req, res, next) => {
  try {
    const { title, pages, summary, stocks, authorId, categories } = req.body;
    //cek falsy input
    if (!title || !pages || !summary || !stocks || !authorId || !categories) {
      // bad request
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const book = new Books({
      title,
      summary,
      pages,
      categories,
      authorId,
      stocks,
      deletedAt: null,
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

BooksController.upload = async (req, res, next) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const uploadBooksUrl = await Books.findByIdAndUpdate(
      req.params.id,
      { $set: { imageUrl } },
      { new: true }
    );

    if (!uploadBooksUrl) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BOOK_NOT_FOUND,
      };
    }
    res.status(200).json(uploadBooksUrl);
  } catch (error) {
    next(error);
  }
};

BooksController.getAll = async (req, res, next) => {
  try {
    const getBooks = await Books.find();
    if (!getBooks) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BOOK_NOT_FOUND,
      };
    }
    res.json(getBooks);
  } catch (error) {
    next(error);
  }
};

BooksController.getById = async (req, res, next) => {
  try {
    const getBookId = await Books.findById(req.params.id);
    if (!getBookId) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BOOK_NOT_FOUND,
      };
    }
    res.json(getBookId);
  } catch (error) {
    next(error);
  }
};

BooksController.putById = async (req, res, next) => {
  try {
    const { title, pages, summary, stocks, authorId, categories } = req.body;
    //cek falsy input
    if (!title || !pages || !summary || !stocks || !authorId || !categories) {
      // bad request
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const updateBook = await Books.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    if (!updateBook) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BOOK_NOT_FOUND,
      };
    }
    res.status(200).json(updateBook);
  } catch (error) {
    next(error);
  }
};

BooksController.deleteById = async (req, res, next) => {
  try {
    const deleteBook = await Books.findByIdAndDelete({ _id: req.params.id });
    if (!deleteBook) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BOOK_NOT_FOUND,
      };
    }
    const result = { message: "Delete Success" };
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = BooksController;
