const express = require("express");
const routes = express.Router();
const BooksController = require("../controllers/booksControllers");
const BooksModel = require("../models/booksModels");
const AuthorController = require("../controllers/authorControllers");
const AuthorsModel = require("../models/authorModels");

// kumpulkan semua routes disini per bagian ex : /author,/books dll

// books
routes.post("/books/", BooksController.create);
routes.get("/books/", BooksController.getAll);
routes.get("/book/:id", BooksController.getById);
routes.put("/book/:id", BooksController.putById);
routes.delete("/book/:id", BooksController.deleteById);

module.exports = routes;
