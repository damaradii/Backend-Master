const express = require("express");
const routes = express.Router();
const BooksController = require("../controllers/booksControllers");
const BooksModel = require("../models/booksModels");

// kumpulkan semua routes disini per bagian ex : /author,/books dll

// books
routes.post("/", BooksController.create);
routes.get("/", BooksController.getAll);
routes.get("/:id", BooksController.getById);
routes.put("/:id", BooksController.putById);
routes.delete("/:id", BooksController.deleteById);

module.exports = routes;
