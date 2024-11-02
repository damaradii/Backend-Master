const Categorys = require("../models/categoryModels");
const { errorMsg, errorName } = require("../utils");

const CategoryController = {};

CategoryController.create = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const category = new Categorys({
      name,
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

CategoryController.getAll = async (req, res, next) => {
  try {
    const getCategorys = await Categorys.find();
    if (!getCategorys) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.CATEGORY_NOT_FOUND,
      };
    }
    res.status(200).json(getCategorys);
  } catch (error) {
    next(error);
  }
};

CategoryController.getById = async (req, res, next) => {
  try {
    const getCategoryId = await Categorys.findById(req.params.id);
    if (!getCategoryId) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.CATEGORY_NOT_FOUND,
      };
    }
    res.status(200).json(getCategoryId);
  } catch (error) {
    next(error);
  }
};

CategoryController.putById = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }
    const updateCategory = await Categorys.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updateCategory) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.CATEGORY_NOT_FOUND,
      };
    }
    res.status(201).json(updateCategory);
  } catch (error) {
    next(error);
  }
};

CategoryController.deleteById = async (req, res, next) => {
  try {
    const deleteCategory = await Categorys.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!deleteCategory) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.CATEGORY_NOT_FOUND,
      };
    }
    res.status(200).json(deleteCategory);
  } catch (error) {
    next(error);
  }
};

module.exports = CategoryController;
