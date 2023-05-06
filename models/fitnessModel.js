const fitnessDB = require("nedb");

class FitnessData {
  constructor(dbFilePath) {
    if (dbFilePath) {
      this.db = new fitnessDB({ filename: dbFilePath, autoload: true });
    } else {
      this.db = new fitnessDB();
    }
  }
   //Initialize Database and insert examples
  init() {
    this.db.insert({
        name: 'Cardio',
        description: 'Cardio refers to exercises that increase your heart rate and breathing, helping to improve your cardiovascular fitness.',
        type: 'Cardio',
    });
    this.db.insert({
        name: 'Strength',
        description: 'Strength workouts involve exercises that aim to increase muscle strength, endurance, and size, typically by using weights or bands.',
        type: 'Strength',
    });
    this.db.insert({
        name: 'Flexibility',
        description: 'Flexibility refers to the range of motion in your joints and muscles, and can be improved through stretching exercises that aim to increase your overall mobility.',
        type: 'Flexibility',
    });
    return this;
  }

  getAllEntries() {
    return new Promise((resolve, reject) => {
        this.db.find({}, function(err, exercises) {
            if(err){
                reject(err);
            } else {
                resolve(exercises);
                console.log("function all() returns: ", exercises);
            }
        });
    });
   }
}


module.exports = FitnessData;
