const { User } = require("../../models");
// const { Conflict } = require("http-errors");
const createError = require("http-errors");

const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password, subscription, token } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, `Email in use`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    token,
  });

  res.status(201).json({
    status: "succes",
    code: 201,
    data: {
      user: {
        email,
      },
    },
  });

  return result;
};

module.exports = register;

//
