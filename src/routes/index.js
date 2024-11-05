const express = require("express");
const routes = express.Router();
const authorRoutes = require("../routes/authorRoutes");
const bookRoutes = require("../routes/booksRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const borrowerRoutes = require("../routes/borrowerRoutes");
const borrowedBookRoutes = require("../routes/borrowedRoutes");

// kumpulkan semua routes disini per bagian ex : /author,/books dll

routes.use(authorRoutes);
routes.use(bookRoutes);
routes.use(categoryRoutes);
routes.use(borrowerRoutes);
routes.use(borrowedBookRoutes);

module.exports = routes;
