const express = require("express");
const routes = express.Router();
const BooksController = require("../controllers/booksControllers");
const AuthorController = require("../controllers/authorControllers");
const BorrowerController = require("../controllers/borrowerControllers");
const CategoryController = require("../controllers/categoryControllers");
const BorrowedBookscontroller = require("../controllers/borrowedBooksControllers");

// kumpulkan semua routes disini per bagian ex : /author,/books dll

// books
routes.post("/book/", BooksController.create);
routes.get("/books/", BooksController.getAll);
routes.get("/book/:id", BooksController.getById);
routes.put("/book/:id", BooksController.putById);
routes.delete("/book/:id", BooksController.deleteById);
routes.post("/book/upload/:id", BooksController.upload);

// author
routes.post("/author/", AuthorController.create);
routes.get("/authors/", AuthorController.getAll);
routes.get("/author/:id", AuthorController.getById);
routes.put("/author/:id", AuthorController.putById);
routes.delete("/author/:id", AuthorController.deleteById);
routes.post("/author/upload/:id", AuthorController.upload);

// borrower
routes.post("/borrower/", BorrowerController.create);
routes.get("/borrowers/", BorrowerController.getAll);
routes.get("/borrower/:id", BorrowerController.getById);
routes.put("/borrower/:id", BorrowerController.putById);
routes.delete("/borrower/:id", BorrowerController.deleteById);

// categories
routes.post("/xategory/", CategoryController.create);
routes.get("/categories/", CategoryController.getAll);
routes.get("/xategory/:id", CategoryController.getById);
routes.put("/xategory/:id", CategoryController.putById);
routes.delete("/xategory/:id", CategoryController.deleteById);

//borrowed
routes.post("/borrow/book/", BorrowedBookscontroller.createBorrower);
routes.post("/borrow/book/return/:id", BorrowedBookscontroller.createBorrowed);
routes.get("/borrow/book/list", BorrowedBookscontroller.getAll);
routes.get("/borrow/book/", BorrowedBookscontroller.get);
module.exports = routes;
