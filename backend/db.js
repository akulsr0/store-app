const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/shop-app';

module.exports = {
  connectDB: () => {
    return new Promise((resolve) => {
      mongoose
        .connect(DB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          console.log('Database Connected');
          resolve();
        })
        .catch((err) => console.log(err));
    });
  },
};
