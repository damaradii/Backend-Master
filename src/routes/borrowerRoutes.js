const express = require("express");
const borrowerControllers = require("../controllers/borrowerControllers");

const borrowersRoutes = express.Router();
// books
borrowersRoutes.post("/borrower/", borrowerControllers.create);
borrowersRoutes.get("/borrowers/", borrowerControllers.getAll);
borrowersRoutes.get("/borrower/:id", borrowerControllers.getById);
borrowersRoutes.put("/borrower/:id", borrowerControllers.putById);
borrowersRoutes.delete("/borrower/:id", borrowerControllers.deleteById);

module.exports = borrowersRoutes;
