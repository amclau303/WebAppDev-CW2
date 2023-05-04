const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.login = function (req, res, next) {

    let username = req.body.username;
    let password = req.body.password;

    userModel.lookup(username, function (err, user) {
        if(err) {
            console.log("Error looking up user", err);
            return res.status(401).send();
            }
        if (!user) {
            console.log("User ", username, " not found");
            return res.status(401).send();
        }

        //Compare provided password with stored password
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                //if user exists we will write code to create the JWT here
                //then pass onto the next middleware
                next();
            } else {
                return res.status(403).send();
            }
        });
    });
};

