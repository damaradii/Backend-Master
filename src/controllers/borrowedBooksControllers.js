const BorrowedBooks = require("../models/borrowedBooksModels");
const Books = require("../models/booksModels");
const { errorMsg, errorName } = require("../utils");
const mongoose = require("mongoose");

const BorrowedBookscontroller = {};

BorrowedBookscontroller.createBorrower = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { bookId, borrowerId, expectReturnAt } = req.body;
    if (!bookId || !borrowerId || !expectReturnAt) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    var date = new Date(expectReturnAt);

    function isValidDate(date) {
      return !isNaN(Date.parse(date));
    }

    if (!isValidDate(expectReturnAt)) {
      throw {
        name: errorName.BAD_REQUEST,
        message: "Invalid date format for expectReturnAt",
      };
    } else if (date.getTime() < Date.now()) {
      throw {
        name: errorName.BAD_REQUEST,
        message: "Cannot rent because expectReturn is past dates",
      };
    }

    for (const id of bookId) {
      const book = await Books.findOne({ _id: id });

      if (book.stocks <= 0) {
        throw {
          name: errorName.BAD_REQUEST,
          message: "No stock",
        };
      }

      book.stocks = book.stocks - 1;
      await book.save({ session });
    }

    const borrowed = new BorrowedBooks({
      borrowerId: borrowerId,
      bookId: bookId,
      borrowedAt: new Date(),
      expectReturnAt: date,
      returnAt: null,
      createBorrower: true,
    });
    await session.commitTransaction();
    await borrowed.save({ session });
    res.status(201).json({
      message: "created",
      data: { BorrowedBooks: borrowed },
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

BorrowedBookscontroller.getAll = async (req, res, next) => {
  try {
    const getBorrowedBooks = await BorrowedBooks.find({
      returnAt: null,
    })
      .populate("borrowerId", "_id name")
      .populate("bookId", "_id title");
    res.status(200).json({
      message: "ok",
      data: { BorrowedBooks: getBorrowedBooks },
    });
  } catch (error) {
    next(error);
  }
};

BorrowedBookscontroller.createBorrowed = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { returnAt, id } = req.body;
    const input = returnAt ? new Date(returnAt) : new Date();

    function isValidDate(input) {
      return !isNaN(Date.parse(input));
    }

    if (!isValidDate(input)) {
      throw {
        name: errorName.BAD_REQUEST,
        message: "Invalid date format for returnAt",
      };
    }

    const data = await BorrowedBooks.findById(id);
    if (!data) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BOOK_NOT_FOUND,
      };
    }

    const expectReturnAt = data.expectReturnAt;
    const bookCount = data.bookId.length;
    let lateFee = 0;

    if (input > expectReturnAt) {
      const lateDays = (input - expectReturnAt) / (1000 * 60 * 60 * 24);
      const feePerDay = 5000;
      lateFee = lateDays * feePerDay * bookCount;
    }

    const createretuned = await BorrowedBooks.findByIdAndUpdate(
      id,
      { returnAt: input, lateFee },
      { new: true }
    );

    if (!createretuned) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BOOK_NOT_FOUND,
      };
    }
    await session.commitTransaction();
    res.status(201).json({
      message: "created",
      data: { BorrowedBooks: createretuned },
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

module.exports = BorrowedBookscontroller;
