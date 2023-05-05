const goalDB = require("nedb");
const path = require("path");

class GoalData {
  constructor(dbFilePath) {
    if (dbFilePath) {
      this.db = new goalDB({ filename: dbFilePath, autoload: true });
    } else {
      this.db = new goalDB();
    }
  }
  init() {
    this.db.insert({
      name: "Example1",
      description:
        "Example1Example1Example1Example1Example1Example1Example1Example1Example1",
      type: "Fitness",

    });
    this.db.insert({
      name: "Example2",
      description:
        "Example2Example2Example2Example2Example2Example2Example2Example2Example2Example2",
      type: "Nutrition",

    });
    this.db.insert({
      name: "Example3",
      description:
        "Example3Example3Example3Example3Example3Example3Example3Example3Example3",
      type: "Lifestyle",
   
    });
    return this;
  }

  getAllEntries() {
    return new Promise((resolve, reject) => {
      this.db.find({}, function (err, goals) {
        if (err) {
          reject(err);
        } else {
          resolve(goals);
          console.log("function all() returns: ", goals);
        }
      });
    });
  }

  addGoal(name, description, type) {
    var entry = {
      name: name,
      description: description,
      type: type,
      published: new Date().toISOString().split('T')[0]
    }
    console.log('Entry Create', entry);
    this.db.insert(entry, function(err, doc) {
      if (err) {
        console.log('Error inserting document', subject);
      } else {
        console.log('Document inserted into databse', doc);
      }
    });
  }

  updateGoal (name, description, type) {
    var entry = {
      name: name,
      description: description,
      type: type,
    }
    console.log('Update entry: ', entry);
    this.db.update(entry, function(err, doc) {
      if (err) {
        console.log('Error updating document:', subject);
      } else {
        console.log('Document updated into database', doc);
      }
    });
  }

}

module.exports = GoalData;
