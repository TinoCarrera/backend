const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.userSignup = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const user = await User.findOne({ $or: [{ username }, { email }] }).exec();
  if (user) {
    res.status(400).json({
      message: "Nombre de usuario o correo electrónico ya registrado",
    });
  } else {
    try {
      const { firstName, lastName, email, password, username } = req.body;
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        username,
      });
      const saveUser = await newUser.save();
      res
        .status(201)
        .json({ data: saveUser, message: "Usuario creado correctamente" });
    } catch (error) {
      console.log("Error: " + error);
      res.status(500).json({ message: error.message });
    }
  }
};

exports.userLogin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({
    $or: [{ username }, { email: username }],
  }).exec();
  if (user) {
    if (user.authenticate(password)) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({
        token,
        user,
      });
    } else {
      res.status(400).json({
        message: "Contraseña incorrecta",
      });
    }
  } else {
    res.status(400).json({ message: "Nombre de usuario o correo electrónico incorrecto" });
  }
};

exports.adminSignup = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const user = await User.findOne({ $or: [{ username }, { email }] }).exec();
  if (user) {
    res.status(400).json({
      message: "Nombre de usuario o correo electrónico ya registrado",
    });
  } else {
    try {
      const { firstName, lastName, email, password, username } = req.body;
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        username,
        role: "admin",
      });
      const saveUser = await newUser.save();
      res.status(201).json({
        data: saveUser,
        message: "Administrador creado correctamente",
      });
    } catch (error) {
      console.log("Error: " + error);
      res.status(500).json({ message: error.message });
    }
  }
};

exports.adminLogin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({
    $or: [{ username }, { email: username }],
  }).exec();
  if (user) {
    if (user.authenticate(password) && user.role === "admin") {
      const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({
        token,
        user,
      });
    } else {
      res.status(400).json({
        message: "Contraseña incorrecta",
      });
    }
  } else {
    res.status(400).json({ message: "Nombre de usuario o correo electrónico incorrecto" });
  }
};
