const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/contact");
const { statusSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:id", ctrlWrapper(ctrl.getContactById));

router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:id", ctrlWrapper(ctrl.removeContact));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateContact));

router.patch(
  "/:id/favorite",
  validation(statusSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

//
module.exports = router;
