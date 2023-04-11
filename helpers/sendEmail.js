const sgMailm = require("@sendgrid/mail");

require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;

sgMailm.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "zeeper90@gmail.com" };
  try {
    await sgMailm.send(email);
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
