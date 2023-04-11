const { User } = require("../../models");
const gravatar = require("gravatar");
const createError = require("http-errors");
const { v4 } = require("uuid");

const bcrypt = require("bcryptjs");

const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password, subscription, token } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, `Email in use`);
  }
  const verificationToken = v4();

  const avatarURL = gravatar.url(email);

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const mail = {
    to: email,
    subject: "email confirmation",
    html: `<a target="_blank" href="http://localgost:3003/api/users/verify${verificationToken}">Email confirm</a>`,
  };

  await sendEmail(mail);

  const result = await User.create({
    avatarURL,
    email,
    password: hashPassword,
    subscription,
    token,
    verificationToken,
  });

  res.status(201).json({
    status: "succes",
    code: 201,
    data: {
      user: {
        avatarURL,
        email,
        verificationToken,
      },
    },
  });

  return result;
};

module.exports = register;

//
