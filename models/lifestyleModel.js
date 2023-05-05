const lifestyleDB = require("nedb");

class LifestyleData {
  constructor(dbFilePath) {
    if (dbFilePath) {
      this.db = new lifestyleDB({ filename: dbFilePath, autoload: true });
    } else {
      this.db = new lifestyleDB();
    }
  }
  init() {
    this.db.insert({
        name: 'Exercise',
        description: ' Incorporating regular physical activity into your daily routine can improve your overall health, reduce the risk of chronic diseases, and boost mood and energy levels.',
        type: 'Lifestyle',
    });
    this.db.insert({
        name: 'Diet',
        description: 'Eating a balanced and varied diet that includes plenty of fruits, vegetables, whole grains, lean protein, and healthy fats can provide the nutrients your body needs to function properly and maintain optimal health.',
        type: 'Lifestyle',
    });
    this.db.insert({
        name: 'Stress Management',
        description: 'Practicing stress-reducing activities like mindfulness, meditation, yoga, or spending time in nature can help reduce stress levels, improve mental health, and promote overall well-being.',
        type: 'Lifestyle',
    });
    return this;
  }

  getAllEntries() {
    return new Promise((resolve, reject) => {
        this.db.find({}, function(err, lifestyles) {
            if(err){
                reject(err);
            } else {
                resolve(lifestyles);
                console.log("function all() returns: ", lifestyles);
            }
        });
    });
   }
}

module.exports = LifestyleData;
