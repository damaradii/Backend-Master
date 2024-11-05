const Borrowers = require("../models/borrowerModels");
const { errorMsg, errorName } = require("../utils");
const mongoose = require("mongoose");

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
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      joinAt,
      deletedAt: null,
    });

    await borrower.save();
    res.status(201).json({
      message: "created",
      data: { Borrowers: borrower },
    });
  } catch (error) {
    next(error);
  }
};

BorrowerController.getAll = async (req, res, next) => {
  try {
    const getBorrowers = await Borrowers.find({ isDeleted: false });
    if (!getBorrowers) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BORROWER_NOT_FOUND,
      };
    }
    res.status(200).json({
      message: "ok",
      data: { Borrowers: getBorrowers },
    });
  } catch (error) {
    next(error);
  }
};

BorrowerController.getById = async (req, res, next) => {
  try {
    const getBorrowerId = await Borrowers.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!getBorrowerId) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BORROWER_NOT_FOUND,
      };
    }
    res.status(200).json({
      message: "ok",
      data: { Borrowers: getBorrowerId },
    });
  } catch (error) {
    next(error);
  }
};

BorrowerController.putById = async (req, res, next) => {
  try {
    const { name, email, id } = req.body;

    if (!name || !email || !id) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }
    const updateBorrower = await Borrowers.findByIdAndUpdate(id, {
      name,
      email,
    });
    if (!updateBorrower) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BORROWER_NOT_FOUND,
      };
    }
    res.status(200).json({
      message: "Borrower updated successfully",
      data: updateBorrower,
    });
  } catch (error) {
    next(error);
  }
};

BorrowerController.deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }
    const deleteBorrower = await Borrowers.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      {
        isDeleted: true,
      }
    );
    if (!deleteBorrower) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BORROWER_NOT_FOUND,
      };
    }
    res.status(200).json({
      message: "Deleted successfully",
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = BorrowerController;
