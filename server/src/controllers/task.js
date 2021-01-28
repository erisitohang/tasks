const catchAsync = require('../utils/catchAsync');
const service = require('../services/task');

/**
 * taks
 */
const list = catchAsync(async (req, res) => {
  const tasks = await service.getAll();
  res.send(tasks);
});

/**
 * taks
 */
const update = catchAsync(async (req, res) => {
  await service.updateById(req.body);
  res.send([]);
});

module.exports = {
  list,
  update,
};
