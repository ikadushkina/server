const express = require("express");
const controllers = require("../controllers");

const router = express.Router();

router.get("/login", controllers.auth.login);
router.post("/logout", controllers.auth.logout);

module.exports = router;
