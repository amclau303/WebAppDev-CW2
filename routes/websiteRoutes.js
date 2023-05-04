const express = require("express");
const router = express.Router();
const controller = require("../controllers/websiteController.js");

router.get("/", controller.index_page);
router.get("/login", controller.login_page);

router.get("/register", controller.register_page);
router.post("/register", controller.post_new_user);

module.exports = router;