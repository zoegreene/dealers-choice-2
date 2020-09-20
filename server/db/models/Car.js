const Sequelize = require('sequelize');
const { STRING, TEXT } = Sequelize;
const faker = require('faker');
const db = require('../db');

const Car = db.define('car', {
  model: {
    type: STRING,
    allowNull: false
  },
  manufacturer: {
    type: STRING,
    allowNull: false
  },
  type: {
    type: STRING
  },
  color: {
    type: STRING
  },
  description: {
    type: TEXT
  }
});

const makeCars = () => {
  const cars = [];
  for (let i = 0; i < 25; i++) {
    cars.push(Car.create({
      model: faker.vehicle.model(),
      manufacturer: faker.vehicle.manufacturer(),
      type: faker.vehicle.type(),
      color: faker.vehicle.color(),
      description: faker.commerce.productDescription()
    }))
  }
  return cars;
}

const syncAndSeed = async () => {
  await db.sync({ force: true });
  await Promise.all([
    makeCars()
  ]);
}

module.exports = {
    Car,
    syncAndSeed
}

