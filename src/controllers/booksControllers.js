const Books = require("../models/booksModels");
const { errorMsg, errorName } = require("../utils");

const BooksController = {};

BooksController.create = async (req, res, next) => {
  try {
    const { title, pages, summary, stocks } = req.body;

    //cek falsy input
    if (!title || !pages || !summary || !stocks) {
      // bad request
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const book = new Books({
      title,
      pages,
      summary,
      stocks,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

BooksController.getAll = async (req, res) => {
  try {
    const getBooks = await Books.find();
    res.json(getBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

BooksController.getById = async (req, res) => {
  try {
    const getBookId = await Books.findById(req.params.id);
    res.json(getBookId);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

BooksController.putById = async (req, res) => {
  try {
    const updateBook = await Books.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updateBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

BooksController.deleteById = async (req, res) => {
  try {
    const deleteBook = await Books.findByIdAndDelete(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(deleteBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = BooksController;
