const UserDAO = require('../models/userModel.js'); 

exports.index_page = function (req, res) {
    res.render("index");
}

exports.login_page = function (req, res) {
    res.render("login");
}

exports.register_page = function (req, res) {
    res.render("register");
}

exports.post_new_user = function (req, res) {
    const user = req.body.username;
    const password = req.body.pass;

    if (! user || !password) {
        res.send(401, "No username/password");
        return;
    }

    UserDAO.lookup(user, function(err, u) {
        if (u) {
            res.send(401, "User exists", user);
            return;
        }
        UserDAO.create(user, password);
        console.log("Register user: ", user, "Password: ", password);
        res.redirect("/login");
    });
}

exports.handle_login = function (req, res) {
    res.render("newEntry", {
        user:"user"
    });
}