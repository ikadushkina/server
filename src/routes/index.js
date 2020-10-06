const auth = require("./auth");
const express = require("express");
const doc = require("./doc");
const tag = require("./tag");

const router = express.Router();

router.use("/auth", auth);
router.use("/doc", doc);
router.use("/tag", tag);

module.exports = router;
