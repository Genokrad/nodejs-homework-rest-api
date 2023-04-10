const express = require("express");

const { auth, ctrlWrapper } = require("../../middlewares");
const { current: ctrl } = require("../../controllers");
const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
