const express = require('express');
const router = express.Router();

const db = require('../db/index');
const { Car } = db.models;

// GET /api/cars
router.get('/', async (req, res, next) => {
  try {
    const cars = await Car.findAll();
    res.send(cars);
  }
  catch(err) {
    next(err);
  }
});

// POST /api/cars
router.post('/', async (req, res, next) => {
  try {
    const newCar = await Car.create(req.body);
    res.status(201).send(newCar);
  }
  catch(err) {
    next(err);
  }
});

// GET /api/cars/:id
router.get('/:id', async (req, res, next) => {
  try {
    const car = await Car.findByPk(req.params.id);
    res.json(car);
  }
  catch(err) {
    next(err);
  }
});

// DELETE /api/cars/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const car = await Car.findByPk(req.params.id);
    await car.destroy();
    res.sendStatus(204);
  }
  catch(err) {
    next(err);
  }
});

// PUT /api/cars/:id
router.put('/:id', async (req, res, next) => {
  try {
    const car = await Car.findByPk(req.params.id);
    await car.update(req.body);
    res.send(car);
  }
  catch(err) {
    next(err);
  }
});


module.exports = router;
