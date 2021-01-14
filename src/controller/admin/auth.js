const User = require("../../models/user");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const username = req.body.username;
  const email = req.body.email;

  User.findOne({ $or: [{ username }, { email }] }).then((user) => {
    if (user) {
      return res.status(400).json({
        message: "Nombre de usuario o correo electrónico ya registrado",
      });
    } else {
      const { firstName, lastName, email, password, username } = req.body;

      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        username,
        role: "admin",
      });

      newUser.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: "Algo salió mal",
          });
        }
        if (data) {
          return res.status(201).json({
            message: "Administrador creado correctamente",
          });
        }
      });
    }
  });
};

exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ $or: [{ username }, { email: username }] }).then((user) => {
    if (user) {
      if (user.authenticate(password) && user.role === "admin") {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        const {
          _id,
          firstName,
          lastName,
          username,
          email,
          role,
          fullName,
        } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            username,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          message: "Contraseña incorrecta",
        });
      }
    } else {
      return res.status(400).json({ message: "Usuario no registrado" });
    }
  });
};

exports.requireLogin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};
