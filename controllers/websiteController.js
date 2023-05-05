const UserDAO = require("../models/userModel.js");
const FitnessData = require("../models/fitnessModel.js");
const fitnessDAO = new FitnessData();
fitnessDAO.init();
const NutritionData = require("../models/nutritionModel.js");
const nutritionDAO = new NutritionData();
nutritionDAO.init();
const LifestyleData = require("../models/lifestyleModel.js");
const lifestyleDAO = new LifestyleData();
lifestyleDAO.init();

exports.index_page = function (req, res) {
  res.render("index");
};

exports.login_page = function (req, res) {
  res.render("login");
};

exports.register_page = function (req, res) {
  res.render("register");
};

exports.post_new_user = function (req, res) {
  const user = req.body.username;
  const password = req.body.password;

  if (!user || !password) {
    res.send(401, "No username/password");
    return;
  }

  UserDAO.lookup(user, function (err, u) {
    if (u) {
      console.log("User Exists");
      res.send(401, "User exists", user);
      return;
    }
    UserDAO.create(user, password);
    console.log("Register user: ", user, "Password: ", password);
    res.redirect("/login");
  });
};

exports.handle_login = function (req, res) {
  res.render("home", {
    user: "user",
  });
};

exports.user_page = function (req, res) {
  res.render("home", {
    user: "user",
  });
};

exports.logout = function (req, res) {
  res.clearCookie("jwt").status(200).redirect("/");
};


exports.fitness_page = function (req, res) {
  fitnessDAO.getAllEntries().then((list) => {
    res.render("fitness", {
      user:"user",
      exercises: list,
    });
  })
};

exports.lifestyle_page = function (req, res) {
  lifestyleDAO.getAllEntries().then((list) => {
    res.render("lifestyle", {
      user:"user",
      lifestyles: list,
    });
  })
};

exports.nutrition_page = function (req, res) {
  nutritionDAO.getAllEntries().then((list) => {
    res.render("nutrition", {
      user:"user",
      nutritions:list,
    }, 
    );
  })
};

exports.goals_page = function (req, res) {
  res.render("goals", {
    user:"user",
  });
};
