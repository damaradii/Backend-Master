const Categorys = require("../models/categoryModels");
const { errorMsg, errorName } = require("../utils");

const CategoryController = {};

CategoryController.create = async (req, res, next) => {
  try {
    const { bookId, borrowerId, borrowedAt, expectReturnAt } = req.body;
    if (!bookId || !borrowerId || !borrowedAt || !expectReturnAt) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const category = new Categorys({
      bookId,
      borrowerId,
      borrowedAt,
      expectReturnAt,
      returnAt,
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};
