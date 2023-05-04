const express = require("express");
const router = express.Router();
const controller = require("../controllers/websiteController.js");
const {login} = require("../auth/auth");
const {verify} = require("../auth/auth");

router.get("/", controller.index_page);
router.get("/login", controller.login_page);
router.post("/login", login, controller.handle_login);

router.get("/register", controller.register_page);
router.post("/register", controller.post_new_user);



module.exports = router;