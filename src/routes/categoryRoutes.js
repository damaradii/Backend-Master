const express = require("express");
const categoryControllers = require("../controllers/categoryControllers");

const categoryRoutes = express.Router();
// books
categoryRoutes.post("/xategory/", categoryControllers.create);
categoryRoutes.get("/categories/", categoryControllers.getAll);
categoryRoutes.get("/xategory/:id", categoryControllers.getById);
categoryRoutes.put("/xategory/:id", categoryControllers.putById);
categoryRoutes.delete("/xategory/:id", categoryControllers.deleteById);

module.exports = categoryRoutes;
