const Datastore = require("nedb");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class UserDAO {
  constructor(dbFilePath) {
    if (dbFilePath) {
      this.db = new Datastore({ filename: dbFilePath, autoload: true });
    } else {
      this.db = new Datastore();
    }
  }
   //Initialize Database and admin example
  init() {
    this.db.insert({
      user: "admin",
      password: "aaaaaaaa",
    });
    return this;
  }
  // Function to register a new account
  create(username, password) {
    const that = this;
    bcrypt.hash(password, saltRounds).then(function (hash) {
      var entry = { user: username, password: hash };
      that.db.insert(entry, function (err) {
        if (err) {
          console.log("Can't insert user: ", username);
        }
      });
    });
  }

  // Looks up existing user account
  lookup(user, cb) {
    this.db.find({ user: user }, function (err, entries) {
      if (err) {
        return cb(null, null);
      } else {
        if (entries.length == 0) {
          return cb(null, null);
        }
        return cb(null, entries[0]);
      }
    });
  }
}

const dao = new UserDAO();
dao.init();

module.exports = dao;
