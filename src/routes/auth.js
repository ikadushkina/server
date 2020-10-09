const express = require("express");
const controllers = require("../controllers");

const router = express.Router();

router.post("/login", controllers.auth.login);
router.post("/logout", controllers.auth.logout);
router.post("/register", controllers.auth.register);

module.exports = router;
