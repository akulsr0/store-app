const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/User');
const { doUserExists } = require('../utils/doUserExists');
const { JWT_SECRET } = require('../utils/default');

router.post('/', async (req, res) => {
  const token = req.body?.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await User.findById(decoded.id).select('-password');
  res.json({ user });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const checkUserExists = await doUserExists(email);
  const user = checkUserExists ? checkUserExists[0] : null;
  if (user) {
    const checkCredentials = await bcrypt.compare(password, user.password);
    if (checkCredentials) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: '365d',
      });
      return res.json({ token, msg: 'Logged In Successfully' });
    }
    return res.json({ msg: 'Invalid Credentials' });
  }
  res.json({ msg: "User doesn't exists" });
});

router.post('/register', async (req, res) => {
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
