const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Rutas
const userRouter = require("./routes/user.routes");
const categoryRouter = require("./routes/category.routes");

// Variables de entorno
require("dotenv").config();

// Conexión con MongoDB
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error de conexión:"));
db.once("open", () => {
  console.log("Conexión establecida con MongoDB");
});

app.use(express.json());
app.use("/", userRouter);
app.use("/categories", categoryRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});
