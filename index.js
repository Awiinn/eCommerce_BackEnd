const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/products", require("./api/products.js"));
app.use("/categories", require("./api/categories.js"));
app.use("/auth", require("./auth/auth.js"));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
