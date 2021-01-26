const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./src/middlewares/authorization');
const app = express();

// Configuration
const port = process.env.PORT || 8080;

// Cors
app.use(cors());

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send(JSON.stringify({ Hello: 'Worlds' }));
});

require('./src/routes')(app, auth);

app.listen(port, function () {
  console.log(`Starting Proxy at localhost:${port}`);
});
