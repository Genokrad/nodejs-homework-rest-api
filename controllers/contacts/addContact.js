const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const { _id } = req.user;
  console.log({ ...req.body, owner: _id });
  const result = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "succes",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;
