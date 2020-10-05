const auth = require("./auth");
const express = require("express");
const db = require("../db/index");

const router = express.Router();

router.use("/auth", auth);

module.exports = router;
