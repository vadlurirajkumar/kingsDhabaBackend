const jwt = require("jsonwebtoken")

const generateToken = (_id) => {
    return jwt.sign({ id: _id }, "qazwsx123", {
      expiresIn: 5 * 24 * 60 * 60 * 1000,
    });
  };
module.exports = generateToken;