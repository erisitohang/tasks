const express = require('express');
const router = express.Router();

const task = require('./controllers/task');
const user = require('./controllers/user');

module.exports = (app) => {
  app.use('/api', router);
  router.get('/task', task.list);
  router.put('/task', task.update);
  router.get('/user', user.list);
};
