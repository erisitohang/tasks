const catchAsync = require('../utils/catchAsync');
const service = require('../services/user');

/**
 * User login
 */
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).send();
    return;
  }

  const user = await service.authenticate(email, password);
  if (!user) {
    res.status(401).send();
    return;
  }

  const tokens = await service.generateToken(user);
  res.send(tokens);
});

/**
 * Registration
 */
const register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || !validator.isEmail(email)) {
    res.status(422).send();
    return;
  }

  await service.addUser(name, email, password);
  res.status(201).send();
});

module.exports = {
  login,
  register,
};
