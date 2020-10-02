const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/User');
const { doUserExists } = require('../utils/doUserExists');
const { JWT_SECRET } = require('../utils/default');

router.post('/', async (req, res) => {
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

module.exports = router;
