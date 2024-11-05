const Categorys = require("../models/categoryModels");
const { errorMsg, errorName } = require("../utils");
const mongoose = require("mongoose");

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
      _id: new mongoose.Types.ObjectId(),
      name,
    });

    await category.save();
    res.status(201).json({
      message: "created",
      data: { Categorys: category },
    });
  } catch (error) {
    next(error);
  }
};

CategoryController.getAll = async (req, res, next) => {
  try {
    const getCategorys = await Categorys.find({ isDeleted: false });
    if (!getCategorys) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.CATEGORY_NOT_FOUND,
      };
    }
    res.status(200).json({
      message: "ok",
      data: { Categorys: getCategorys },
    });
  } catch (error) {
    next(error);
  }
};

CategoryController.getById = async (req, res, next) => {
  try {
    const getCategoryId = await Categorys.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!getCategoryId) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.CATEGORY_NOT_FOUND,
      };
    }
    res.status(200).json({
      message: "ok",
      data: { Categorys: getCategoryId },
    });
  } catch (error) {
    next(error);
  }
};

CategoryController.putById = async (req, res, next) => {
  try {
    const { name, id } = req.body;

    if (!name || !id) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }
    const updateCategory = await Categorys.findByIdAndUpdate(id, { name });
    if (!updateCategory) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.CATEGORY_NOT_FOUND,
      };
    }
    res.status(200).json({
      message: "Category updated successfully",
      data: updateCategory,
    });
  } catch (error) {
    next(error);
  }
};

CategoryController.deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }
    const deleteCategory = await Categorys.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      {
        isDeleted: true,
      }
    );
    if (!deleteCategory) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.CATEGORY_NOT_FOUND,
      };
    }
    res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = CategoryController;
