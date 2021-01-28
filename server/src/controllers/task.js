const catchAsync = require('../utils/catchAsync');
const service = require('../services/task');

/**
 * tasks list
 */
const list = catchAsync(async (req, res) => {
  const { search } = req.query;
  const tasks = await service.getAll(search);
  res.send(tasks);
});

/**
 * update task
 */
const update = catchAsync(async (req, res) => {
  await service.updateById(req.body);
  res.send([]);
});

/**
 * add task
 */
const store = catchAsync(async (req, res) => {
  const { id, description } = req.body
  const task = await service.addByStatusId(id, description);
  res.send(task);
});

module.exports = {
  list,
  update,
  store
};
