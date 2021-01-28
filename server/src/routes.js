const express = require('express');
const router = express.Router();

const task = require('./controllers/task');
module.exports = (app) => {
  app.use('/api', router);
  router.get('/task', task.list);
  router.put('/task', task.update);
};
