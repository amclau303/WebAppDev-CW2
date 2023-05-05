const goalDB = require("nedb");

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
        name: 'Example1',
        description: 'Example1Example1Example1Example1Example1Example1Example1Example1Example1',
        type: 'Example1Example1',
    });
    return this;
  }

  getAllEntries() {
    return new Promise((resolve, reject) => {
        this.db.find({}, function(err, goals) {
            if(err){
                reject(err);
            } else {
                resolve(goals);
                console.log("function all() returns: ", goals);
            }
        });
    });
   }
}

module.exports = GoalData;
