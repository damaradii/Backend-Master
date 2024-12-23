const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const connectDB = require("./config/mongodb");
const { errorHandling } = require("./middleware/errorHandling");
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./src/.env" });

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use("/api/v1", routes);
app.use(errorHandling);
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
