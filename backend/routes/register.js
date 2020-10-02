const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();
const User = require('../models/User');
const { doUserExists } = require('../utils/doUserExists');

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const duplicateUser = await doUserExists(email);
  if (duplicateUser) {
    return res.json({ msg: 'Email already exists.' });
  }
  const hashPassword = await bcrypt.hash(password, 12);
  const userObj = { name, email, password: hashPassword };
  const user = new User(userObj);
  await user.save();
  res.json({ user, msg: 'Account created successfully' });
});

module.exports = router;
