require("dotenv").config("../../.env");
const jwt = require("jsonwebtoken");

export const createSecretToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });
};

