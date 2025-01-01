const jwt = require("jsonwebtoken");
const { Users } = require("../models/index");
const secret = require("../cfg/cfg").jwt.secret;

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied", success: false });
  }

  try {
    jwt.verify(token, secret, async (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Invalid token", success: false });
      }

      // Token içinden gelen kullanıcı ID'si ile BusinessOwner'ı doğrula
      const userFromToken = await Users.findByPk(user.userId);
      if (!userFromToken) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }

      req.user = userFromToken;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = authenticateToken;
