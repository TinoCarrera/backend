const jwt = require("jsonwebtoken");

exports.requireLogin = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } else {
    res.status(400).json({ message: "Autorización requerida" });
  }
};

exports.userMiddleware = (req, res, next) => { 
  if (req.user.role !== "user") {
    res.status(400).json({ message: "Acceso de usuario denegado" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    res.status(400).json({ message: "Acceso de administrador denegado" });
  }
  next();
};
