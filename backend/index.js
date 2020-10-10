const express = require('express');
const { connectDB } = require('./db');

const app = express();
const PORT = 5001;

app.use(express.json());

app.use('/auth', require('./routes/auth'));

// Connect DB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running...`);
  });
});
