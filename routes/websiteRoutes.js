const express = require("express");
const router = express.Router();
const controller = require("../controllers/websiteController.js");

router.get("/", controller.index_page);
router.get("/login", controller.login_page);

module.exports = router;