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

router.get("/home", verify, controller.user_page);
router.get("/logout", verify, controller.logout);

router.get("/fitness", verify, controller.fitness_page);

router.get("/lifestyle", verify, controller.lifestyle_page);

router.get("/nutrition", verify, controller.nutrition_page);

router.get("/goals", verify, controller.goals_page);

module.exports = router;