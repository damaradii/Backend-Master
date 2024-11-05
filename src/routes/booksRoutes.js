const express = require("express");
const booksControllers = require("../controllers/booksControllers");

const booksRoutes = express.Router();
// books
booksRoutes.post("/book/", booksControllers.create);
booksRoutes.get("/books/", booksControllers.getAll);
booksRoutes.get("/book/:id", booksControllers.getById);
booksRoutes.put("/book/:id", booksControllers.putById);
booksRoutes.delete("/book/:id", booksControllers.deleteById);
booksRoutes.post("/book/upload/:id", booksControllers.upload);

module.exports = booksRoutes;
