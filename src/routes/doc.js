const express = require("express");
const controllers = require("../controllers");

const router = express.Router();

router.post("/add", controllers.doc.addDocument);
router.post("/addtag", controllers.doc.addTagToDoc);

module.exports = router;
