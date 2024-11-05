const express = require("express");
const authorControllers = require("../controllers/authorControllers");

const authoreRoutes = express.Router();
// author
authoreRoutes.post("/author/", authorControllers.create);
authoreRoutes.get("/authors/", authorControllers.getAll);
authoreRoutes.get("/author/:id", authorControllers.getById);
authoreRoutes.put("/author/:id", authorControllers.putById);
authoreRoutes.delete("/author/:id", authorControllers.deleteById);
authoreRoutes.post("/author/upload/:id", authorControllers.upload);

module.exports = authoreRoutes;
