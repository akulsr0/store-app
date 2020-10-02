const User = require('../models/User');

async function doUserExists(email) {
  const user = await User.find({ email });
  if (user.length > 0) {
    return user;
  }
  return false;
}

module.exports = {
  doUserExists,
};
