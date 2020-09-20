const db = require('./db');
const { Car, syncAndSeed } = require('./models/Car');

module.exports = {
  db,
  syncAndSeed,
  models: {
    Car
  }
}
