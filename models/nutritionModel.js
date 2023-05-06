const nutritionDB = require("nedb");

class NutritionData {
  constructor(dbFilePath) {
    if (dbFilePath) {
      this.db = new nutritionDB({ filename: dbFilePath, autoload: true });
    } else {
      this.db = new nutritionDB();
    }
  }
   //Initialize Database and insert examples
  init() {
    this.db.insert({
        name: 'Mediterranean',
        description: 'A diet based on the traditional cuisine of Mediterranean countries, emphasizing plant-based foods, whole grains, fish, and healthy fats like olive oil.',
        type: 'Diet',
    });
    this.db.insert({
        name: 'Ketogenic',
        description: 'A high-fat, low-carbohydrate diet that aims to put the body in a state of ketosis, where it burns fat for energy instead of carbohydrates.',
        type: 'Diet',
    });
    this.db.insert({
        name: 'Vegetarian',
        description: 'A diet that excludes meat and fish, and instead focuses on plant-based foods like fruits, vegetables, grains, legumes, and nuts.',
        type: 'Diet',
    });
    return this;
  }

  getAllEntries() {
    return new Promise((resolve, reject) => {
        this.db.find({}, function(err, nutritions) {
            if(err){
                reject(err);
            } else {
                resolve(nutritions);
                console.log("function all() returns: ", nutritions);
            }
        });
    });
   }
}


module.exports = NutritionData;
