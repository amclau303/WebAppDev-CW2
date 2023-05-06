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
const GoalData = require("../models/goalModel.js");
const goalDAO = new GoalData();
goalDAO.init();

//Displays Index Page
exports.index_page = function (req, res) {
  res.render("index");
};

//Displays Login Page
exports.login_page = function (req, res) {
  res.render("login");
};
//Displays Register Page
exports.register_page = function (req, res) {
  res.render("register");
};

//Post request to register new user account
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

//Login handler for new home page
exports.handle_login = function (req, res) {
  res.render("home", {
    user: "user",
  });
};

// User home page sidebar function
exports.user_page = function (req, res) {
  res.render("home", {
    user: "user",
  });
};

//Logout handler
exports.logout = function (req, res) {
  res.clearCookie("jwt").status(200).redirect("/");
};

//Displays fitness page with fitnessDB results
exports.fitness_page = function (req, res) {
  fitnessDAO.getAllEntries().then((list) => {
    res.render("fitness", {
      user: "user",
      exercises: list,
    });
  });
};

//Displays lifestyle page with lifestyleDB results
exports.lifestyle_page = function (req, res) {
  lifestyleDAO.getAllEntries().then((list) => {
    res.render("lifestyle", {
      user: "user",
      lifestyles: list,
    });
  });
};

//Displays nutrition page with nutritionDB results
exports.nutrition_page = function (req, res) {
  nutritionDAO.getAllEntries().then((list) => {
    res.render("nutrition", {
      user: "user",
      nutritions: list,
    });
  });
};

//Displays goals page with goalsDB list
exports.goals_page = function (req, res) {
  goalDAO.getAllEntries().then((list) => {
    res.render("goals", {
      user: "user",
      goals: list,
    });
  });
};

//Post request to create new Goal entry
exports.post_new_entry = function (req, res) {
  console.log("Creating new post entry request");
  if (!req.body.name || !req.body.description || !req.body.type) {
    res.status(400).send("No Title/Description/Type");
    return;
  }
  goalDAO.addGoal(req.body.name, req.body.description, req.body.type);
  res.redirect("/goals");
};

//Displays edit page through finding DB id through param ID
exports.edit_model = function (req, res) {
  const id = req.params.id;
  console.log("ID: ", req.params.id)
  console.log("Name:", req.body.name, " Description:", req.body.description, "Type:", req.body.type)
  goalDAO.findGoalByID(id).then((entries) => {
    console.log(entries);
    res.render("edit", {
      user:"user",
      goals: entries,
    });

  });
}

//Post request to update goal
exports.update_goal = function (req, res) {
  console.log("Updating:", req.params.id);
  if(!req.body.name || !req.body.description){
    res.status(400).send("No name/description");
  }
  goalDAO.updateGoal(req.params.id, req.body.name, req.body.description, req.body.published);
  res.redirect("/goals");
}


exports.remove_confirm = function (req, res) {
  const id = req.params.id;
  goalDAO.findGoalByID(id).then((entries) => {
    console.log(entries);
    res.render("delete", {
      user:"user",
      goals: entries,
    });
  });
}
//Post request to remove goal
exports.remove_goal = function (req, res) {
  console.log("Removing Goal");
  goalDAO.removeGoal(req.params.id);
  res.redirect("/goals");
}