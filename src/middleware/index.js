const jwt = require("jsonwebtoken");

exports.requireLogin = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } else {
    return res.status(400).json({ message: "Necesitas iniciar sesión" });
  }
};

exports.userMiddleware = (req, res, next) => { 
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "Necesitas ser usuario" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Necesitas ser administrador" });
  }
  next();
};
