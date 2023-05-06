const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.login = function (req, res, next) {

    let username = req.body.username;
    let password = req.body.password;

    // Looks up username and checks if it exists.
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
                let payload = {username: user.username};
                let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 300});
                res.cookie("jwt", accessToken);
                console.log("Logged in");
                next();
            } else {
                return res.status(403).send();
            }
        });
    });
};

    //Verify function to specify access on certain web pages
exports.verify = function (req, res, next) {
    let accessToken = req.cookies.jwt;
    if (!accessToken) {
        return res.status(403).send();
    }
    let payload;
    try {
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (e) {
        //if an error occurs return unauthorized error
        res.status(401).send();
    }
};
