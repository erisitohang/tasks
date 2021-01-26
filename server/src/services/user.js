const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/user');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../configs/env');

const authenticate = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) return;
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return;

  return user;
};

const generateToken = (user) => {
  const payload = { id: user.id };
  const access_token = jwt.sign(payload, APP_SECRET, {
    expiresIn: '1h',
  });
  const access_token_expiry = jwt.decode(access_token).exp;

  return {
    access_token,
    access_token_expiry,
  };
};

module.exports = {
  authenticate,
  generateToken,
};
