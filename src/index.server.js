const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

// Rutas
const userRouter = require("./routes/user.routes");
const categoryRouter = require("./routes/category.routes");
const productRouter = require("./routes/product.routes");
const cartRouter = require("./routes/cart.routes");

// Variables de entorno
require("dotenv").config();

// Conexión con MongoDB
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error de conexión:"));
db.once("open", () => {
  console.log("Conexión establecida con MongoDB");
});

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/", userRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});
