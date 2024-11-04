const Borrowers = require("../models/borrowerModels");
const { errorMsg, errorName } = require("../utils");

const BorrowerController = {};

BorrowerController.create = async (req, res, next) => {
  try {
    const { name, email, joinAt } = req.body;
    if (!name || !email) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const borrower = new Borrowers({
      name,
      email,
      joinAt,
      deletedAt: null,
    });

    await borrower.save();
    res.status(201).json(borrower);
  } catch (error) {
    next(error);
  }
};

BorrowerController.getAll = async (req, res, next) => {
  try {
    const getBorrowers = await Borrowers.find();
    if (!getBorrowers) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BORROWER_NOT_FOUND,
      };
    }
    res.status(200).json(getBorrowers);
  } catch (error) {
    next(error);
  }
};

BorrowerController.getById = async (req, res, next) => {
  try {
    const getBorrowerId = await Borrowers.findById(req.params.id);
    if (!getBorrowerId) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BORROWER_NOT_FOUND,
      };
    }
    res.status(200).json(getBorrowerId);
  } catch (error) {
    next(error);
  }
};

BorrowerController.putById = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }
    const updateBorrower = await Borrowers.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updateBorrower) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BORROWER_NOT_FOUND,
      };
    }
    res.status(201).json(updateBorrower);
  } catch (error) {
    next(error);
  }
};

BorrowerController.deleteById = async (req, res, next) => {
  try {
    const deleteBorrower = await Borrowers.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!deleteBorrower) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BORROWER_NOT_FOUND,
      };
    }
    const result = { message: "Delete Success" };
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = BorrowerController;
