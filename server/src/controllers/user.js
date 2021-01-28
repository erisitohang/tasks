const catchAsync = require('../utils/catchAsync');
const service = require('../services/user');

/**
 * taks
 */
const list = catchAsync(async (req, res) => {
  const tasks = await service.getAll();
  res.send(tasks);
});



module.exports = {
  list
};
