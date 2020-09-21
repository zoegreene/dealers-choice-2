const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('./db/index');
const router = require('./routes/index');

const app = express();
module.exports = app;

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Static file-serving middleware
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/cars', router);

// app.get('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

// 404 handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 500 handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Internal server error');
});

const PORT = process.env.PORT || 3000;

const init = async () => {
  try {
    await db.syncAndSeed();
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  }
  catch(err) {
    console.error(err);
  }
}

init();
