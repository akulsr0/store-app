const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/User');
const { doUserExists } = require('../utils/doUserExists');
const { JWT_SECRET } = require('../utils/default');

router.post('/', async (req, res) => {
  if (!req.body.token) {
    res.json({ msg: 'No token' });
  }
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
      return res.json({ token, msg: 'Logged In Successfully', success: true });
    }
    return res.json({ msg: 'Invalid Credentials', success: false });
  }
  res.json({ msg: "User doesn't exists", success: false });
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const duplicateUser = await doUserExists(email);
  if (duplicateUser) {
    return res.json({ msg: 'Email already exists.', success: false });
  }
  const hashPassword = await bcrypt.hash(password, 12);
  const userObj = { name, email, password: hashPassword };
  const user = new User(userObj);
  await user.save();
  res.json({ user, msg: 'Account created successfully', success: true });
});

module.exports = router;
