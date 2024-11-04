const BorrowedBooks = require("../models/borrowedBooksModels");
const { errorMsg, errorName } = require("../utils");

const BorrowedBookscontroller = {};

BorrowedBookscontroller.createBorrower = async (req, res, next) => {
  try {
    const { bookId, borrowerId, expectReturnAt, borrowedAt } = req.body;
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
    }

    const borrowed = new BorrowedBooks({
      borrowerId,
      bookId,
      borrowedAt: new Date(),
      expectReturnAt: date,
      createBorrower: true,
    });

    await borrowed.save();
    res.status(201).json(borrowed);
  } catch (error) {
    next(error);
  }
};

BorrowedBookscontroller.getAll = async (req, res, next) => {
  try {
    const getBorrowedBooks = await BorrowedBooks.find({
      returnAt: { $exists: false },
    });
    res.status(200).json(getBorrowedBooks);
  } catch (error) {
    next(error);
  }
};

BorrowedBookscontroller.get = async (req, res, next) => {
  try {
    const getBorrowedBooks = await BorrowedBooks.find();

    res.status(200).json(getBorrowedBooks);
  } catch (error) {
    next(error);
  }
};

BorrowedBookscontroller.createBorrowed = async (req, res, next) => {
  try {
    const { returnAt } = req.body;
    const input = returnAt ? new Date(returnAt) : new Date();

    function isValidDate(input) {
      return !isNaN(Date.parse(input));
    }

    if (!isValidDate(input)) {
      throw {
        name: errorName.BAD_REQUEST,
        message: "Invalid date format for expectReturnAt",
      };
    }

    const data = await BorrowedBooks.findById(req.params.id);
    const expectReturnAt = data.expectReturnAt;

    let lateFee = 0;
    if (input > expectReturnAt) {
      const lateDays = (input - expectReturnAt) / (1000 * 60 * 60 * 24);
      const feePerDay = 5000;
      lateFee = lateDays * feePerDay;
    }

    const createretuned = await BorrowedBooks.findByIdAndUpdate(
      req.params.id,
      { $set: { returnAt: input, lateFee } },
      { new: true }
    );

    if (!createretuned) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BOOK_NOT_FOUND,
      };
    }
    res.status(201).json(createretuned);
  } catch (error) {
    next(error);
  }
};

module.exports = BorrowedBookscontroller;
