const UserDAO = require("../models/userModel.js");

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
  res.render("fitness", {
    user:"user",
  });
};

exports.lifestyle_page = function (req, res) {
  res.render("lifestyle", {
    user:"user",
  });
};

exports.nutrition_page = function (req, res) {
  res.render("nutrition", {
    user:"user",
  });
};

exports.goals_page = function (req, res) {
  res.render("goals", {
    user:"user",
  });
};
