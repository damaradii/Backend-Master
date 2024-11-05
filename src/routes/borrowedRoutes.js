const express = require("express");
const borrowedBooksControllers = require("../controllers/borrowedBooksControllers");

const borrowedBooksRoutes = express.Router();
borrowedBooksRoutes.post(
  "/borrow/book/",
  borrowedBooksControllers.createBorrower
);
borrowedBooksRoutes.get("/borrow/book/list", borrowedBooksControllers.getAll);
borrowedBooksRoutes.post(
  "/borrow/book/return/:id",
  borrowedBooksControllers.createBorrowed
);

module.exports = borrowedBooksRoutes;
