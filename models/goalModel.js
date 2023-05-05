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
        type: 'Fitness',
    });
    this.db.insert({
      name: 'Example2',
      description: 'Example2Example2Example2Example2Example2Example2Example2Example2Example2Example2',
      type: 'Nutrition',
  });
  this.db.insert({
    name: 'Example3',
    description: 'Example3Example3Example3Example3Example3Example3Example3Example3Example3',
    type: 'Lifestyle',
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
