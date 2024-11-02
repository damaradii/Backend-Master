const express = require("express");
const routes = express.Router();
const BooksController = require("../controllers/booksControllers");
const BooksModel = require("../models/booksModels");
const AuthorController = require("../controllers/authorControllers");
const AuthorsModel = require("../models/authorModels");

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

module.exports = routes;
