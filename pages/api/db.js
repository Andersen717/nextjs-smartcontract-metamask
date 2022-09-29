
const mongoose = require('mongoose');

// Mongo DB conncetion
const database = 'mongodb://localhost:27017/test';
// mongoose.createConnection('mongodb://localhost:27017/test');
const db = mongoose.connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Mongoose success connect'))
  .catch(err => console.log(err));

export default db;