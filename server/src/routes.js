const express = require('express');
const router = express.Router();

const auth = require('./controllers/login');
module.exports = (app, verifyToken) => {
  app.use('/api', router);
  router.post('/auth/login', auth.login);
};
