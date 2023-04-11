const { User } = require("../../models");
const gravatar = require("gravatar");
const createError = require("http-errors");

const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password, subscription, token } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, `Email in use`);
  }

  const avatarURL = gravatar.url(email);

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const result = await User.create({
    avatarURL,
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
        avatarURL,
        email,
      },
    },
  });

  return result;
};

module.exports = register;

//
